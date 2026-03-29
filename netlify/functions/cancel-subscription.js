const users = {};
function authenticate(authHeader) { try { const [id] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return users[id] || null; } catch (e) { return null; } }
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const user = authenticate(event.headers.Authorization);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    user.subscriptionStatus = 'canceled';
    return jsonResponse(200, { message: 'Subscription canceled' });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};