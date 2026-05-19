const { loadData, saveData, generateId, hashPassword, createToken, findUserByEmail, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const { name, email, password } = JSON.parse(event.body || '{}');

    if (!name || !email || !password) {
      return response(400, { message: 'All fields are required' });
    }

    if (password.length < 8) {
      return response(400, { message: 'Password must be at least 8 characters' });
    }

    const data = loadData();

    // Check duplicate email
    if (findUserByEmail(data, email)) {
      return response(400, { message: 'Email already registered' });
    }

    const id = generateId();
    const hashedPassword = await hashPassword(password);

    const user = {
      id,
      email,
      password: hashedPassword,
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

    data.users[id] = user;
    saveData(data);

    const token = createToken(id, email);

    return response(200, {
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
    return response(500, { message: 'Internal server error' });
  }
};
