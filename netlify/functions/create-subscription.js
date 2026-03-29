const crypto = require('crypto');

function generateId() { return crypto.randomBytes(16).toString('hex'); }

function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

function decodeToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    if (decoded.id && decoded.email) return decoded;
  } catch (e) {}
  try {
    const [id, email] = Buffer.from(token, 'base64').toString().split(':');
    if (id && email) return { id, email, subscriptionStatus: undefined, plan: undefined };
  } catch (e) {}
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
    user.subscriptionStatus = 'active';
    user.subscriptionId = generateId();
    const subscriptionEnds = new Date();
    if (plan === 'yearly') subscriptionEnds.setFullYear(subscriptionEnds.getFullYear() + 1);
    else subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    user.subscriptionEndsAt = subscriptionEnds.toISOString();
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    user.licenseKey = 'SDB-' + Array(4).fill(0).map(_=>c[Math.floor(Math.random()*c.length)]).join('') + '-' + Array(4).fill(0).map(_=>c[Math.floor(Math.random()*c.length)]).join('') + '-' + Array(4).fill(0).map(_=>c[Math.floor(Math.random()*c.length)]).join('');
    user.licensedDomains = [];
    user.onboardingComplete = true;
    return jsonResponse(200, { message: 'Subscription created', subscriptionId: user.subscriptionId, licenseKey: user.licenseKey });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};