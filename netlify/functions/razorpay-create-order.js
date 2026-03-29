const crypto = require('crypto');
function generateId() { return crypto.randomBytes(16).toString('hex'); }
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }
function decodeToken(token) {
  try { const d = JSON.parse(Buffer.from(token, 'base64').toString('utf8')); if (d.id) return d; } catch (e) {}
  try { const [id] = Buffer.from(token, 'base64').toString().split(':'); if (id) return { id }; } catch (e) {}
  return null;
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return jsonResponse(401, { message: 'Unauthorized' });
    const user = decodeToken(authHeader.substring(7));
    if (!user) return jsonResponse(401, { message: 'Invalid token' });
    const { plan } = JSON.parse(event.body || '{}');
    const amount = plan === 'yearly' ? 49000 : 4900;
    return jsonResponse(200, { orderId: 'order_' + generateId(), keyId: 'test_key_id', amount, currency: 'INR' });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};