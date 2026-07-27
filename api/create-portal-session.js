export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { stripeCustomerId } = req.body;
  if (!stripeCustomerId) {
    return res.status(400).json({ error: 'Missing stripeCustomerId' });
  }

  try {
    const params = new URLSearchParams();
    params.append('customer', stripeCustomerId);
    params.append('return_url', `${req.headers.origin}?portal=return`);

    const response = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: session.error?.message || 'Stripe error' });
    }

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
