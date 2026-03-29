const { loadData, saveData, authenticate, response } = require('./shared');

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

    user.subscriptionStatus = 'canceled';
    saveData(data);

    return response(200, { message: 'Subscription canceled' });
  } catch (e) {
    console.error('Cancel subscription error:', e);
    return response(500, { message: 'Internal server error' });
  }
};