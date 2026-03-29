const crypto = require('crypto');

function generateId() { return crypto.randomBytes(16).toString('hex'); }

function jsonResponse(s, b) { return { statusCode: s, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }, body: JSON.stringify(b) }; }

function decodeToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch (e) {
    console.log('Token decode error:', e.message);
    return null;
  }
}

exports.handler = async function(event) {
  console.log('Start trial called, method:', event.httpMethod);
  console.log('Headers:', JSON.stringify(event.headers));
  
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' });
  }
  
  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    console.log('Auth header:', authHeader);
    
    if (!authHeader) {
      console.log('No auth header');
      return jsonResponse(401, { message: 'No authorization header' });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      console.log('Invalid auth format');
      return jsonResponse(401, { message: 'Invalid authorization format' });
    }
    
    const token = authHeader.substring(7);
    console.log('Token (first 100 chars):', token.substring(0, 100));
    console.log('Token length:', token.length);
    
    const user = decodeToken(token);
    console.log('Decoded user:', user);
    
    if (!user) {
      return jsonResponse(401, { message: 'Invalid token - could not decode' });
    }

    const { plan } = JSON.parse(event.body || '{}');
    console.log('Plan:', plan);
    
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) {
      return jsonResponse(400, { message: 'Valid plan required (monthly or yearly)' });
    }

    user.plan = plan;
    user.subscriptionStatus = 'trialing';
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();
    user.subscriptionId = generateId();

    console.log('Trial started for:', user.email, 'trial ends:', user.trialEndsAt);

    return jsonResponse(200, { message: 'Trial started', trialEndsAt: user.trialEndsAt, subscriptionId: user.subscriptionId });
  } catch (e) {
    console.log('Error:', e.message);
    console.log('Stack:', e.stack);
    return jsonResponse(500, { message: 'Error: ' + e.message });
  }
};