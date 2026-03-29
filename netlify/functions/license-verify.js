const licenses = {};
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'GET') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const { licenseKey, domain } = event.queryStringParameters || {};
    if (!licenseKey || !domain) return jsonResponse(400, { message: 'License key and domain required' });
    const lic = licenses[licenseKey];
    if (!lic || lic.domain !== domain) return jsonResponse(400, { valid: false, message: 'Invalid or expired license' });
    return jsonResponse(200, { valid: true, message: 'License is valid' });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};