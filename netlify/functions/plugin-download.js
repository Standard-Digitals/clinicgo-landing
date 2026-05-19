const { loadData, authenticate, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'GET') return response(405, { message: 'Method not allowed' });

  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const data = loadData();
    const user = authenticate(authHeader, data);

    if (!user) return response(401, { message: 'Unauthorized' });

    const content = 'ClinicGo Plugin ZIP placeholder';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=clinic-go.zip',
        'Access-Control-Allow-Origin': '*'
      },
      body: Buffer.from(content).toString('base64'),
      isBase64Encoded: true
    };
  } catch (e) {
    console.error('Plugin download error:', e);
    return response(500, { message: 'Internal server error' });
  }
};
