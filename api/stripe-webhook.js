import crypto from 'crypto';

// Stripe signature verification needs the raw request body, not the parsed one.
export const config = {
  api: { bodyParser: false },
};

const SUPABASE_URL = 'https://loaxiwaotfxmvyxpzdud.supabase.co';

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function isValidStripeSignature(rawBody, signatureHeader, secret, toleranceSeconds = 300) {
  if (!signatureHeader) return false;
  const parts = Object.fromEntries(signatureHeader.split(',').map((p) => p.split('=')));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (!Number.isFinite(age) || Math.abs(age) > toleranceSeconds) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('hex');

  const expectedBuf = Buffer.from(expected, 'utf8');
  const signatureBuf = Buffer.from(signature, 'utf8');
  if (expectedBuf.length !== signatureBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}

function serviceHeaders(serviceKey) {
  return {
    'Content-Type': 'application/json',
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    Prefer: 'return=representation',
  };
}

async function patchProfile(filterQuery, body, serviceKey) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/profiles?${filterQuery}`, {
    method: 'PATCH',
    headers: serviceHeaders(serviceKey),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Supabase update failed (${response.status}): ${errBody}`);
  }
  return response.json();
}

async function findUserIdByCustomerId(customerId, serviceKey) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?stripe_customer_id=eq.${customerId}&select=id&limit=1`,
    { headers: serviceHeaders(serviceKey) }
  );
  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Supabase lookup failed (${response.status}): ${errBody}`);
  }
  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? rows[0].id : null;
}

async function handleCheckoutCompleted(session, serviceKey) {
  const userId = session.client_reference_id;
  if (!userId) {
    console.error('[stripe-webhook] checkout.session.completed missing client_reference_id');
    return;
  }
  const body = { subscription_status: 'active' };
  if (session.customer) body.stripe_customer_id = session.customer;
  await patchProfile(`id=eq.${userId}`, body, serviceKey);
}

async function handleSubscriptionEnded(object, serviceKey, eventType) {
  const customerId = object.customer;
  if (!customerId) {
    console.error(`[stripe-webhook] ${eventType} missing customer id`);
    return;
  }
  const userId = await findUserIdByCustomerId(customerId, serviceKey);
  if (!userId) {
    console.error(`[stripe-webhook] ${eventType} — no profile found for customer ${customerId}`);
    return;
  }
  await patchProfile(`id=eq.${userId}`, { subscription_status: 'free' }, serviceKey);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let rawBody;
  try {
    rawBody = (await readRawBody(req)).toString('utf8');
  } catch (error) {
    return res.status(400).json({ error: 'Could not read request body' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !isValidStripeSignature(rawBody, req.headers['stripe-signature'], webhookSecret)) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object, serviceKey);
        break;
      case 'customer.subscription.deleted':
      case 'invoice.payment_failed':
        await handleSubscriptionEnded(event.data.object, serviceKey, event.type);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`[stripe-webhook] error handling ${event.type}`, error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ received: true });
}
