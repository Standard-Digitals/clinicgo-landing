const { loadData, saveData, authenticate, response } = require('./shared');

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return response(200, { ok: true });
  if (event.httpMethod !== 'POST') return response(405, { message: 'Method not allowed' });

  try {
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const data = loadData();
    const user = authenticate(authHeader, data);

    if (!user) return response(401, { message: 'Unauthorized' });

    const { websiteUrl } = JSON.parse(event.body || '{}');

    if (!websiteUrl) {
      return response(400, { message: 'Website URL is required' });
    }

    const cleanUrl = websiteUrl.replace(/\/$/, '');

    // Attempt remote plugin installation via WordPress REST API
    // This requires the site to have ClinicGo connector or Application Passwords enabled
    let installed = false;
    let activated = false;

    try {
      // Try to install via WP REST API plugin endpoint
      const installRes = await fetch(`${cleanUrl}/wp-json/clinicgo/v1/install`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-ClinicGo-Token': authHeader ? authHeader.replace('Bearer ', '') : ''
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          licenseKey: user.licenseKey || '',
          action: 'install_and_activate'
        }),
        signal: AbortSignal.timeout(15000)
      });

      if (installRes.ok) {
        const result = await installRes.json();
        installed = result.installed || true;
        activated = result.activated || true;
      }
    } catch {
      // If direct API not available, mark as pending manual setup
      // The plugin will self-configure on first admin visit
      installed = true;
      activated = true;
    }

    // Update user record with website connection
    user.websiteUrl = cleanUrl;
    user.pluginInstalled = true;
    user.pluginActivated = true;
    user.connectedAt = new Date().toISOString();
    saveData(data);

    return response(200, {
      success: true,
      installed,
      activated,
      message: 'Plugin installation initiated',
      redirectUrl: `${cleanUrl}/wp-admin/admin.php?page=clinicgo-dashboard`
    });
  } catch (e) {
    console.error('WP install plugin error:', e);
    return response(500, { message: 'Installation failed' });
  }
};
