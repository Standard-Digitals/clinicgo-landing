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
    const { licenseKey, domain } = JSON.parse(event.body || '{}');
    if (!licenseKey || !domain) return jsonResponse(400, { message: 'License key and domain required' });
    if (user.licenseKey !== licenseKey) return jsonResponse(400, { message: 'Invalid license key' });
    user.licensedDomains = [...(user.licensedDomains || []), domain];
    return jsonResponse(200, { message: 'License activated', domain });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};