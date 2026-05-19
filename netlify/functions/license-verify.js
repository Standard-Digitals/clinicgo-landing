const { loadData, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'GET') return response(405, { message: 'Method not allowed' });

  try {
    const { licenseKey, domain } = event.queryStringParameters || {};

    if (!licenseKey || !domain) {
      return response(400, { message: 'License key and domain required' });
    }

    const data = loadData();
    const license = data.licenses[licenseKey];

    if (!license || license.domain !== domain) {
      return response(400, { valid: false, message: 'Invalid or expired license' });
    }

    return response(200, { valid: true, message: 'License is valid' });
  } catch (e) {
    console.error('License verify error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
