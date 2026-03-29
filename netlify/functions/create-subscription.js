const crypto = require('crypto');

const users = {};
const licenses = {};

function generateId() { return crypto.randomBytes(16).toString('hex'); }
function generateLicenseKey() { const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; let k = 'SDB-'; for (let i = 0; i < 4; i++) k += c[Math.floor(Math.random() * c.length)]; k += '-'; for (let i = 0; i < 4; i++) k += c[Math.floor(Math.random() * c.length)]; k += '-'; for (let i = 0; i < 4; i++) k += c[Math.floor(Math.random() * c.length)]; return k; }
function authenticate(authHeader) { if (!authHeader || !authHeader.startsWith('Bearer ')) return null; try { const [id] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return users[id] || null; } catch (e) { return null; } }
function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(b) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const user = authenticate(event.headers.Authorization);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    const { plan } = JSON.parse(event.body || '{}');
    user.subscriptionStatus = 'active';
    user.subscriptionId = generateId();
    const subscriptionEnds = new Date();
    if (plan === 'yearly') subscriptionEnds.setFullYear(subscriptionEnds.getFullYear() + 1);
    else subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    user.subscriptionEndsAt = subscriptionEnds.toISOString();
    const licenseKey = generateLicenseKey();
    user.licenseKey = licenseKey;
    user.licensedDomains = [];
    licenses[licenseKey] = { userId: user.id, domain: '' };
    user.onboardingComplete = true;
    return jsonResponse(200, { message: 'Subscription created', subscriptionId: user.subscriptionId, licenseKey });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};