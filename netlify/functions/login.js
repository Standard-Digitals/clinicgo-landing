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

function decodeToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

exports.handler = async function(event) {
  console.log('Login handler called');
  
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { method: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { email, password } = body;

    if (!email || !password) {
      return jsonResponse(400, { message: 'Email and password required' });
    }

    // Create user based on provided credentials
    const id = generateId();
    const user = {
      id,
      email,
      password,
      name: body.name || email.split('@')[0],
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

    const token = Buffer.from(JSON.stringify(user)).toString('base64');

    return jsonResponse(200, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        licenseKey: user.licenseKey,
        trialEndsAt: user.trialEndsAt,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (e) {
    console.error('Login error:', e);
    return jsonResponse(500, { message: 'Internal server error: ' + e.message });
  }
};