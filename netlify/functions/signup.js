const { loadData, saveData, generateId, hashPassword, createToken, findUserByEmail, response } = require('./shared');

function generateClinicGoLicense() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = 'CGO-';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    if (i < 2) key += '-';
  }
  return key;
}

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

    if (findUserByEmail(data, email)) {
      return response(400, { message: 'Email already registered' });
    }

    const id = generateId();
    const hashedPassword = await hashPassword(password);
    const licenseKey = generateClinicGoLicense();

    // Free premium until August 31
    const freeUntil = '2025-08-31T23:59:59.000Z';

    const user = {
      id,
      email,
      password: hashedPassword,
      name,
      plan: 'premium',
      subscriptionStatus: 'active',
      licenseKey,
      licensedDomains: [],
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
      trialEndsAt: undefined,
      subscriptionId: generateId(),
      subscriptionEndsAt: freeUntil,
      freeUntil
    };

    data.users[id] = user;
    data.licenses[licenseKey] = { userId: id, domain: '', status: 'active', expiresAt: freeUntil };
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
        subscriptionEndsAt: user.subscriptionEndsAt,
        freeUntil: user.freeUntil,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (e) {
    console.error('Signup error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
