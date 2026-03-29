const { loadData, saveData, generateId, authenticate, response } = require('./shared');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return response(405, { message: 'Method not allowed' });
  }

  try {
    const data = loadData();
    const user = authenticate(event.headers.Authorization, data);

    if (!user) {
      return response(401, { message: 'Unauthorized' });
    }

    const { plan } = JSON.parse(event.body);

    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) {
      return response(400, { message: 'Valid plan required (monthly or yearly)' });
    }

    user.plan = plan;
    user.subscriptionStatus = 'trialing';

    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();

    const subscriptionId = generateId();
    data.subscriptions[subscriptionId] = {
      id: subscriptionId,
      userId: user.id,
      plan,
      status: 'trialing',
      trialStart: new Date().toISOString(),
      trialEnds: trialEnds.toISOString()
    };

    saveData(data);

    return response(200, {
      message: 'Trial started',
      trialEndsAt: trialEnds.toISOString(),
      subscriptionId
    });
  } catch (e) {
    console.error('Start trial error:', e);
    return response(500, { message: 'Internal server error' });
  }
};