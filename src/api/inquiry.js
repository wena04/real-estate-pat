/**
 * Sends an inquiry to the /api/inquiry serverless endpoint.
 * @param {Object} payload – { source, name, email, phone, ...extras }
 * @returns {Promise<{ok: boolean}>}
 */
export async function sendInquiry(payload) {
  const res = await fetch('/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Submission failed');
  }
  return res.json();
}
