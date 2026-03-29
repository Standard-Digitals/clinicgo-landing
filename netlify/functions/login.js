const { loadData, generateId, response } = require('./shared');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return response(405, { message: 'Method not allowed' });
  }

  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return response(400, { message: 'Email and password required' });
    }

    const data = loadData();

    let foundUser;
    for (const user of Object.values(data.users)) {
      if (user.email === email && user.password === password) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return response(401, { message: 'Invalid email or password' });
    }

    const token = Buffer.from(`${foundUser.id}:${foundUser.email}`).toString('base64');

    return response(200, {
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
    return response(500, { message: 'Internal server error' });
  }
};