const { loadData, saveData, generateId, generateLicenseKey, authenticate, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const data = loadData();
    const user = authenticate(authHeader, data);

    if (!user) return response(401, { message: 'Unauthorized' });

    const { plan, paymentId } = JSON.parse(event.body || '{}');

    user.subscriptionStatus = 'active';
    user.subscriptionId = generateId();

    const subscriptionEnds = new Date();
    if (plan === 'yearly') subscriptionEnds.setFullYear(subscriptionEnds.getFullYear() + 1);
    else subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    user.subscriptionEndsAt = subscriptionEnds.toISOString();

    const licenseKey = generateLicenseKey();
    user.licenseKey = licenseKey;
    user.licensedDomains = [];
    user.onboardingComplete = true;

    data.licenses[licenseKey] = { userId: user.id, domain: '' };
    saveData(data);

    return response(200, {
      message: 'Subscription created',
      subscriptionId: user.subscriptionId,
      licenseKey
    });
  } catch (e) {
    console.error('Create subscription error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
