import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData, saveData, authenticate } from './_lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = authenticate(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { licenseKey, domain } = req.body;
  if (!licenseKey || !domain) return res.status(400).json({ message: 'License key and domain required' });

  const data = loadData();
  const license = data.licenses[licenseKey];
  if (!license || license.userId !== user.id) return res.status(400).json({ message: 'Invalid license key' });

  data.licenses[licenseKey] = { userId: user.id, domain };
  data.users[user.id].licensedDomains = [...(data.users[user.id].licensedDomains || []), domain];
  saveData(data);

  res.json({ message: 'License activated', domain });
}
