import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  parseLicenceBody, findLicence, getLicenceStatus,
  getActiveDomainCount, findActivation, activateDomain,
  buildLicenceResponse, signResponse
} from './_licence';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { licence_key, domain, wp_version, plugin_ver } = parseLicenceBody(req);

  if (!licence_key || !domain) {
    return res.json({ success: false, error: 'missing_params', message: 'License key and domain are required.' });
  }

  try {
    const licence = await findLicence(licence_key);
    if (!licence) {
      return res.json({ success: false, error: 'invalid_key', message: 'Invalid licence key. Please check and try again.' });
    }

    const status = getLicenceStatus(licence);
    if (status === 'suspended') {
      return res.json({ success: false, error: 'suspended', message: 'This licence has been suspended. Contact support.' });
    }
    if (status === 'expired') {
      return res.json({ success: false, error: 'expired', message: 'This licence has expired. Please renew.' });
    }

    // Check domain activation limit
    const existingActivation = await findActivation(licence.id, domain);
    if (!existingActivation) {
      const activeCount = await getActiveDomainCount(licence.id);
      if (activeCount >= licence.max_activations) {
        return res.json({ success: false, error: 'domain_limit', message: 'Activation limit reached. Deactivate another domain first.' });
      }
    }

    // Activate domain
    await activateDomain(licence.id, domain, wp_version, plugin_ver);

    // Build signed response
    const response = buildLicenceResponse(licence, status === 'grace' ? 'grace' : 'active');
    response._sig = signResponse(response);

    return res.json(response);
  } catch (err: any) {
    console.error('license-activate error:', err.message, err.stack);
    return res.status(500).json({ success: false, error: 'server_error', message: 'Internal server error.' });
  }
}
