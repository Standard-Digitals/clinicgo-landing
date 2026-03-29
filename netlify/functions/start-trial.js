const crypto = require('crypto');

function generateId() { return crypto.randomBytes(16).toString('hex'); }

function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }, body: JSON.stringify(b) }; }

function decodeToken(token) {
  try { return JSON.parse(Buffer.from(token, 'base64').toString()); } catch (e) { return null; }
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  
  try {
    const authHeader = event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return jsonResponse(401, { message: 'Unauthorized' });
    
    const token = authHeader.substring(7);
    const user = decodeToken(token);
    if (!user) return jsonResponse(401, { message: 'Invalid token' });

    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) return jsonResponse(400, { message: 'Valid plan required' });

    user.plan = plan;
    user.subscriptionStatus = 'trialing';
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();
    user.subscriptionId = generateId();

    const newToken = Buffer.from(JSON.stringify(user)).toString('base64');

    return jsonResponse(200, { message: 'Trial started', trialEndsAt: trialEnds.toISOString(), subscriptionId: user.subscriptionId });
  } catch (e) { return jsonResponse(500, { message: 'Error: ' + e.message }); }
};