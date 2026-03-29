function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }
function decodeToken(token) { try { return JSON.parse(Buffer.from(token, 'base64').toString()); } catch (e) { return null; } }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const authHeader = event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return jsonResponse(401, { message: 'Unauthorized' });
    const user = decodeToken(authHeader.substring(7));
    if (!user) return jsonResponse(401, { message: 'Invalid token' });
    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) return jsonResponse(400, { message: 'Valid plan required' });
    user.plan = plan;
    return jsonResponse(200, { message: 'Plan changed', plan });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};