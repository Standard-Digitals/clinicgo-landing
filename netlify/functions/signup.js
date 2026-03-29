const crypto = require('crypto');

function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

function jsonResponse(status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async function(event) {
  console.log('Signup handler called');
  
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return jsonResponse(400, { message: 'All fields are required' });
    }

    const id = generateId();
    
    // Create user data object
    const user = {
      id,
      email,
      password, // In production, hash this!
      name,
      plan: undefined,
      subscriptionStatus: undefined,
      licenseKey: undefined,
      licensedDomains: [],
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
      trialEndsAt: undefined,
      subscriptionId: undefined,
      subscriptionEndsAt: undefined
    };

    // Encode user data directly in token (base64 encoded JSON)
    const token = Buffer.from(JSON.stringify(user)).toString('base64');
    console.log('Created token:', token);
    console.log('Token length:', token.length);

    return jsonResponse(200, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        licenseKey: user.licenseKey,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (e) {
    console.error('Signup error:', e);
    return jsonResponse(500, { message: 'Internal server error: ' + e.message });
  }
};