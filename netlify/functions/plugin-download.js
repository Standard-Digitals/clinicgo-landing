function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }
function decodeToken(token) { try { return JSON.parse(Buffer.from(token, 'base64').toString()); } catch (e) { return null; } }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'GET') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const authHeader = event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return jsonResponse(401, { message: 'Unauthorized' });
    const user = decodeToken(authHeader.substring(7));
    if (!user) return jsonResponse(401, { message: 'Invalid token' });
    const content = 'SD Booking Plugin ZIP placeholder';
    return { statusCode: 200, headers: { 'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename=sd-booking.zip', 'Access-Control-Allow-Origin': '*' }, body: Buffer.from(content).toString('base64') };
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};