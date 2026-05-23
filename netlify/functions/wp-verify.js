const { response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const { url } = JSON.parse(event.body || '{}');

    if (!url) {
      return response(400, { message: 'URL is required' });
    }

    const cleanUrl = url.replace(/\/$/, '');
    let isWordPress = false;
    let hasWpAdmin = false;

    // Check WordPress REST API
    try {
      const res = await fetch(`${cleanUrl}/wp-json/wp/v2/`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok || res.status === 401) {
        isWordPress = true;
      }
    } catch {
      // Try alternate detection via wp-login
      try {
        const res = await fetch(`${cleanUrl}/wp-login.php`, {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000)
        });
        if (res.ok || res.status === 200 || res.status === 302) {
          isWordPress = true;
        }
      } catch {
        // Not WordPress
      }
    }

    // Check wp-admin access
    if (isWordPress) {
      try {
        const res = await fetch(`${cleanUrl}/wp-admin/`, {
          method: 'HEAD',
          redirect: 'manual',
          signal: AbortSignal.timeout(5000)
        });
        hasWpAdmin = res.status === 200 || res.status === 302;
      } catch {
        hasWpAdmin = true; // Assume accessible if WordPress detected
      }
    }

    return response(200, { isWordPress, hasWpAdmin, url: cleanUrl });
  } catch (e) {
    console.error('WP verify error:', e);
    return response(500, { message: 'Verification failed', isWordPress: false, hasWpAdmin: false });
  }
};
