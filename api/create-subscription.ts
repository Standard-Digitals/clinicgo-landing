import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData, saveData, generateId, generateLicenseKey, authenticate } from './_lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = authenticate(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { plan } = req.body;
  const data = loadData();
  const u = data.users[user.id];

  u.subscriptionStatus = 'active';
  u.subscriptionId = generateId();
  const ends = new Date();
  plan === 'yearly' ? ends.setFullYear(ends.getFullYear() + 1) : ends.setMonth(ends.getMonth() + 1);
  u.subscriptionEndsAt = ends.toISOString();

  if (!u.licenseKey) {
    const lk = generateLicenseKey();
    u.licenseKey = lk;
    data.licenses[lk] = { userId: u.id, domain: '' };
  }
  u.onboardingComplete = true;
  saveData(data);

  res.json({ message: 'Subscription created', subscriptionId: u.subscriptionId, licenseKey: u.licenseKey });
}
