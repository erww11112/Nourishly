// Resend's default testing sender (no verified domain yet). Resend restricts
// this sender to only deliver to the email address on the Resend account itself —
// see the note in the PR / task description before relying on this for real users.
const RESEND_FROM = 'Nourishly <onboarding@resend.dev>';

const SUPABASE_URL = 'https://loaxiwaotfxmvyxpzdud.supabase.co';
const APP_URL = 'https://nourishly-gray.vercel.app';

function serviceHeaders(serviceKey) {
  return {
    'Content-Type': 'application/json',
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };
}

async function fetchAllProfiles(serviceKey) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id,name,email`, {
    headers: serviceHeaders(serviceKey),
  });
  if (!response.ok) {
    throw new Error(`Supabase profiles lookup failed (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

async function fetchUserIdsWithPlanThisWeek(weekStart, serviceKey) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/meal_plans?week_of=gte.${weekStart}&select=user_id`,
    { headers: serviceHeaders(serviceKey) }
  );
  if (!response.ok) {
    throw new Error(`Supabase meal_plans lookup failed (${response.status}): ${await response.text()}`);
  }
  const rows = await response.json();
  return new Set(rows.map((r) => r.user_id));
}

// Plans are Monday-to-Sunday, so "this week" starts on the most recent Monday.
function mondayOfCurrentWeek(now) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diffToMonday);
  return d.toISOString().split('T')[0];
}

async function sendReminderEmail(profile, resendApiKey) {
  const firstName = (profile.name || '').split(' ')[0] || 'there';
  const subject = "Ready to plan this week's dinners?";
  const html = `
    <p>Hey ${firstName},</p>
    <p>Ready to plan this week's dinners? Your family is waiting 🍽️</p>
    <p><a href="${APP_URL}">Open Nourishly</a> and get a fresh Monday-to-Sunday dinner plan in seconds.</p>
    <p>— The Nourishly team</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [profile.email],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend error (${response.status}): ${await response.text()}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel adds `Authorization: Bearer <CRON_SECRET>` to cron-triggered requests
  // when CRON_SECRET is set — verify it so this endpoint can't be triggered publicly.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!serviceKey || !resendApiKey) {
    return res.status(500).json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY' });
  }

  try {
    const weekStart = mondayOfCurrentWeek(new Date());
    const [profiles, plannedUserIds] = await Promise.all([
      fetchAllProfiles(serviceKey),
      fetchUserIdsWithPlanThisWeek(weekStart, serviceKey),
    ]);

    const toRemind = profiles.filter((p) => p.email && !plannedUserIds.has(p.id));

    const results = await Promise.allSettled(
      toRemind.map((profile) => sendReminderEmail(profile, resendApiKey))
    );

    const sent = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results
      .map((r, i) => (r.status === 'rejected' ? { email: toRemind[i].email, error: r.reason.message } : null))
      .filter(Boolean);

    if (failed.length) {
      console.error('[send-weekly-reminders] failed to send', failed);
    }

    res.status(200).json({
      weekStart,
      totalProfiles: profiles.length,
      alreadyPlanned: plannedUserIds.size,
      reminded: sent,
      failed: failed.length,
    });
  } catch (error) {
    console.error('[send-weekly-reminders] error', error);
    res.status(500).json({ error: error.message });
  }
}
