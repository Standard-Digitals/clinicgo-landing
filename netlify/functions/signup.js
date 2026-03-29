const { loadData, saveData, generateId, response } = require('./shared');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return response(405, { message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = JSON.parse(event.body);

    if (!name || !email || !password) {
      return response(400, { message: 'All fields are required' });
    }

    const data = loadData();

    for (const user of Object.values(data.users)) {
      if (user.email === email) {
        return response(400, { message: 'Email already exists' });
      }
    }

    const id = generateId();
    const user = {
      id,
      email,
      password,
      name,
      plan: undefined,
      subscriptionStatus: undefined,
      licenseKey: undefined,
      licensedDomains: [],
      onboardingComplete: false,
      createdAt: new Date().toISOString()
    };

    data.users[id] = user;
    saveData(data);

    const token = Buffer.from(`${id}:${email}`).toString('base64');

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