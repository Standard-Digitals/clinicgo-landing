const { loadData, saveData, authenticate, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const data = loadData();
    const user = authenticate(authHeader, data);

    if (!user) return response(401, { message: 'Unauthorized' });

    const { licenseKey, domain } = JSON.parse(event.body || '{}');

    if (!licenseKey || !domain) {
      return response(400, { message: 'License key and domain required' });
    }

    const license = data.licenses[licenseKey];
    if (!license || license.userId !== user.id) {
      return response(400, { message: 'Invalid license key' });
    }

    data.licenses[licenseKey] = { userId: user.id, domain };
    user.licensedDomains = [...(user.licensedDomains || []), domain];
    saveData(data);

    return response(200, { message: 'License activated', domain });
  } catch (e) {
    console.error('License activate error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
