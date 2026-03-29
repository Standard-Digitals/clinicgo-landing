const users = {};
function authenticate(authHeader) { try { const [id] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return users[id] || null; } catch (e) { return null; } }
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const user = authenticate(event.headers.Authorization);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) return jsonResponse(400, { message: 'Valid plan required' });
    user.plan = plan;
    return jsonResponse(200, { message: 'Plan changed', plan });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};