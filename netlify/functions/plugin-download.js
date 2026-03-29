const { authenticate, response } = require('./shared');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return response(200, { ok: true });
  }

  if (event.httpMethod !== 'GET') {
    return response(405, { message: 'Method not allowed' });
  }

  try {
    const data = require('./shared').loadData();
    const user = authenticate(event.headers.Authorization, data);

    if (!user) {
      return response(401, { message: 'Unauthorized' });
    }

    const mockPluginContent = 'This is a placeholder for the actual plugin zip file';
    const buffer = Buffer.from(mockPluginContent);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=sd-booking.zip',
        'Access-Control-Allow-Origin': '*'
      },
      body: buffer.toString('base64')
    };
  } catch (e) {
    console.error('Plugin download error:', e);
    return response(500, { message: 'Internal server error' });
  }
};