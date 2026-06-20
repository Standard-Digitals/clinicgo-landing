import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parseLicenceBody, findLicence, findActivation, deactivateDomain } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { licence_key, domain } = parseLicenceBody(req);

  if (!licence_key || !domain) {
    return res.json({ success: false, message: 'Missing parameters.' });
  }

  try {
    const licence = await findLicence(licence_key);
    if (!licence) {
      return res.json({ success: false, message: 'Licence not found.' });
    }

    const activation = await findActivation(licence.id, domain);
    if (!activation || !activation.active) {
      return res.json({ success: false, message: 'Domain is not activated for this licence.' });
    }

    await deactivateDomain(licence.id, domain);

    return res.json({ success: true, message: 'Domain deactivated.' });
  } catch (err: any) {
    console.error('license-deactivate error:', err.message, err.stack);
    return res.status(500).json({ success: false, error: 'server_error', message: 'Internal server error.' });
  }
}
