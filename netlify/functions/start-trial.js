const { loadData, saveData, generateId, authenticate, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const data = loadData();
    const user = authenticate(authHeader, data);

    if (!user) return response(401, { message: 'Unauthorized' });

    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) {
      return response(400, { message: 'Valid plan required (monthly or yearly)' });
    }

    user.plan = plan;
    user.subscriptionStatus = 'trialing';

    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();

    const subscriptionId = generateId();
    user.subscriptionId = subscriptionId;

    data.subscriptions[subscriptionId] = {
      id: subscriptionId,
      userId: user.id,
      plan,
      status: 'trialing',
      trialStart: new Date().toISOString(),
      trialEnds: trialEnds.toISOString(),
      currentPeriodStart: trialEnds.toISOString(),
      currentPeriodEnd: trialEnds.toISOString()
    };

    saveData(data);

    return response(200, {
      message: 'Trial started',
      trialEndsAt: user.trialEndsAt,
      subscriptionId
    });
  } catch (e) {
    console.error('Start trial error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
