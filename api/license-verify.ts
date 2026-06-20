import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  parseLicenceBody, findLicence, getLicenceStatus,
  findActivation, updateLastVerified,
  buildLicenceResponse, signResponse
} from '../helpers/lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { licence_key, domain, plugin_ver } = parseLicenceBody(req);

  if (!licence_key || !domain) {
    return res.json({ success: false, status: 'expired', message: 'Missing parameters.' });
  }

  try {
    const licence = await findLicence(licence_key);
    if (!licence) {
      return res.json({ success: false, status: 'expired', message: 'Invalid licence.' });
    }

    // Check domain is activated
    const activation = await findActivation(licence.id, domain);
    if (!activation || !activation.active) {
      return res.json({ success: false, status: 'domain_mismatch', message: 'Licence not activated for this domain.' });
    }

    // Calculate status
    const status = getLicenceStatus(licence);

    // Update last_verified
    await updateLastVerified(licence.id, domain, plugin_ver || undefined);

    // Build signed response
    const response = buildLicenceResponse(licence, status);
    response._sig = signResponse(response);

    return res.json(response);
  } catch (err: any) {
    console.error('license-verify error:', err.message, err.stack);
    return res.status(500).json({ success: false, error: 'server_error', message: 'Internal server error.' });
  }
}
