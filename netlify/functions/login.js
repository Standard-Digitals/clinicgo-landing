const { loadData, comparePassword, createToken, findUserByEmail, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const { email, password } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return response(400, { message: 'Email and password required' });
    }

    const data = loadData();
    const user = findUserByEmail(data, email);

    if (!user) {
      return response(401, { message: 'Invalid email or password' });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return response(401, { message: 'Invalid email or password' });
    }

    const token = createToken(user.id, user.email);

    return response(200, {
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
    return response(500, { message: 'Internal server error' });
  }
};
