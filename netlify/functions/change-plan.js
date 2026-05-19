const { loadData, saveData, authenticate, response } = require('./shared');

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
      return response(400, { message: 'Valid plan required' });
    }

    user.plan = plan;
    saveData(data);

    return response(200, { message: 'Plan changed', plan });
  } catch (e) {
    console.error('Change plan error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
