const { loadData, generateId, authenticate, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const data = loadData();
    const user = authenticate(authHeader, data);

    if (!user) return response(401, { message: 'Unauthorized' });

    const { plan } = JSON.parse(event.body || '{}');
    const amount = plan === 'yearly' ? 49000 : 4900;
    const keyId = process.env.RAZORPAY_KEY_ID || 'test_key_id';

    return response(200, {
      orderId: 'order_' + generateId(),
      keyId,
      amount,
      currency: 'INR'
    });
  } catch (e) {
    console.error('Razorpay order error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
