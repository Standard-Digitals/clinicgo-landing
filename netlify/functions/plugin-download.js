const users = {};
function authenticate(authHeader) { try { const [id] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return users[id] || null; } catch (e) { return null; } }
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'GET') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const user = authenticate(event.headers.Authorization);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    const content = 'SD Booking Plugin ZIP placeholder';
    return { statusCode: 200, headers: { 'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename=sd-booking.zip', 'Access-Control-Allow-Origin': '*' }, body: Buffer.from(content).toString('base64') };
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};