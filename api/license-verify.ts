import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData } from './_lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { licenseKey, domain } = req.query as { licenseKey?: string; domain?: string };
  if (!licenseKey || !domain) return res.status(400).json({ message: 'License key and domain required' });

  const data = loadData();
  const license = data.licenses[licenseKey];
  if (!license || license.domain !== domain) return res.status(400).json({ valid: false, message: 'Invalid or expired license' });

  res.json({ valid: true, message: 'License is valid' });
}
