const users = {};
const licenses = {};
function authenticate(authHeader) { try { const [id] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return users[id] || null; } catch (e) { return null; } }
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const user = authenticate(event.headers.Authorization);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    const { licenseKey, domain } = JSON.parse(event.body || '{}');
    if (!licenseKey || !domain) return jsonResponse(400, { message: 'License key and domain required' });
    const lic = licenses[licenseKey];
    if (!lic || lic.userId !== user.id) return jsonResponse(400, { message: 'Invalid license key' });
    licenses[licenseKey] = { userId: user.id, domain };
    user.licensedDomains = [...(user.licensedDomains || []), domain];
    return jsonResponse(200, { message: 'License activated', domain });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};