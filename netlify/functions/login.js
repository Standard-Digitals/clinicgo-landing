const crypto = require('crypto');

const users = {};

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
  console.log('Login handler called');
  
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { email, password } = body;

    if (!email || !password) {
      return jsonResponse(400, { message: 'Email and password required' });
    }

    let foundUser;
    for (const user of Object.values(users)) {
      if (user.email === email && user.password === password) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return jsonResponse(401, { message: 'Invalid email or password' });
    }

    const token = Buffer.from(`${foundUser.id}:${foundUser.email}`).toString('base64');

    return jsonResponse(200, {
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        plan: foundUser.plan,
        subscriptionStatus: foundUser.subscriptionStatus,
        licenseKey: foundUser.licenseKey,
        trialEndsAt: foundUser.trialEndsAt,
        onboardingComplete: foundUser.onboardingComplete
      }
    });
  } catch (e) {
    console.error('Login error:', e);
    return jsonResponse(500, { message: 'Internal server error: ' + e.message });
  }
};