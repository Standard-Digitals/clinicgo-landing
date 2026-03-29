const crypto = require('crypto');

const users = {};
const subscriptions = {};
const licenses = {};

function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

function authenticate(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  try {
    const [id] = Buffer.from(token, 'base64').toString().split(':');
    return users[id] || null;
  } catch (e) { return null; }
}

function jsonResponse(status, body) {
  return { statusCode: status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }, body: JSON.stringify(body) };
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  
  try {
    const user = authenticate(event.headers.Authorization);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });

    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) return jsonResponse(400, { message: 'Valid plan required' });

    user.plan = plan;
    user.subscriptionStatus = 'trialing';
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();

    subscriptions[generateId()] = { userId: user.id, plan, status: 'trialing', trialEnds: trialEnds.toISOString() };

    return jsonResponse(200, { message: 'Trial started', trialEndsAt: trialEnds.toISOString() });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};