/**
 * Serverless function – POST /api/inquiry
 * Runtime: Vercel Edge / Node (requires RESEND_API_KEY env var)
 *
 * Body: { source, name, email, phone, ...extraFields }
 */

/** Escape HTML special characters to prevent XSS in email content. */
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { source = 'Website', name, email, ...rest } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source);

  const fields = Object.entries(rest)
    .map(([k, v]) =>
      `<tr><td style="padding:6px 12px;font-weight:600;text-transform:capitalize">${escapeHtml(k.replace(/_/g, ' '))}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`
    )
    .join('');

  const html = `
    <h2 style="font-family:sans-serif;color:#0a2342">New inquiry &#8211; ${safeSource}</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:6px 12px;font-weight:600">Name</td><td style="padding:6px 12px">${safeName}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600">Email</td><td style="padding:6px 12px">${safeEmail}</td></tr>
      ${fields}
    </table>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Replace the 'from' domain with a Resend-verified sender domain before deploying.
        from: 'Patricia Wen Site <noreply@patriciawen.kw.com>',
        to: ['pwen@kw.com'],
        subject: `[${source}] New inquiry from ${name}`,
        html,
        reply_to: email,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(502).json({ error: 'Email delivery failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Inquiry handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
