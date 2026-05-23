const { loadData, saveData, comparePassword, createToken, findUserByEmail, generateId, response } = require('./shared');

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

    // Auto-generate license key for existing users who don't have one
    if (!user.licenseKey) {
      const licenseKey = generateClinicGoLicense();
      user.licenseKey = licenseKey;
      user.plan = 'premium';
      user.subscriptionStatus = 'active';
      user.subscriptionEndsAt = '2025-08-31T23:59:59.000Z';
      user.freeUntil = '2025-08-31T23:59:59.000Z';
      data.licenses[licenseKey] = { userId: user.id, domain: '', status: 'active', expiresAt: '2025-08-31T23:59:59.000Z' };
      saveData(data);
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
        subscriptionEndsAt: user.subscriptionEndsAt,
        freeUntil: user.freeUntil || user.subscriptionEndsAt,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (e) {
    console.error('Login error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
