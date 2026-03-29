const crypto = require('crypto');
const users = {};
function generateId() { return crypto.randomBytes(16).toString('hex'); }
function authenticate(authHeader) { try { const [id] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return users[id] || null; } catch (e) { return null; } }
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const user = authenticate(event.headers.Authorization);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    const { plan } = JSON.parse(event.body || '{}');
    const amount = plan === 'yearly' ? 49000 : 4900;
    return jsonResponse(200, { orderId: 'order_' + generateId(), keyId: 'test_key_id', amount, currency: 'INR' });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};