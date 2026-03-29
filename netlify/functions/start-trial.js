const crypto = require('crypto');

function generateId() { return crypto.randomBytes(16).toString('hex'); }

function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }, body: JSON.stringify(b) }; }

function decodeToken(token) {
  // Try new JSON format first
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    if (decoded.id && decoded.email) {
      console.log('Using new JSON format token');
      return decoded;
    }
  } catch (e) {}
  
  // Try old id:email format
  try {
    const [id, email] = Buffer.from(token, 'base64').toString().split(':');
    if (id && email) {
      console.log('Using old format token');
      return { id, email, subscriptionStatus: undefined, plan: undefined };
    }
  } catch (e) {}
  
  return null;
}

exports.handler = async function(event) {
  console.log('Start trial called');
  
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  
  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    if (!authHeader) return jsonResponse(401, { message: 'No authorization header' });
    if (!authHeader.startsWith('Bearer ')) return jsonResponse(401, { message: 'Invalid auth format' });
    
    const token = authHeader.substring(7);
    const user = decodeToken(token);
    console.log('Decoded user:', user);
    
    if (!user) return jsonResponse(401, { message: 'Invalid token' });

    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) return jsonResponse(400, { message: 'Valid plan required' });

    user.plan = plan;
    user.subscriptionStatus = 'trialing';
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();
    user.subscriptionId = generateId();

    console.log('Trial started for:', user.email);

    return jsonResponse(200, { message: 'Trial started', trialEndsAt: user.trialEndsAt, subscriptionId: user.subscriptionId });
  } catch (e) {
    return jsonResponse(500, { message: 'Error: ' + e.message });
  }
};