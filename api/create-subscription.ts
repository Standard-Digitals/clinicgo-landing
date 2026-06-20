import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData, saveData, generateId, generateLicenseKey, authenticate } from './lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = authenticate(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { plan, action } = req.body;

  // Start trial flow (merged from start-trial.ts)
  if (action === 'trial') {
    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) return res.status(400).json({ message: 'Valid plan required' });

    const data = loadData();
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);

    data.users[user.id].plan = plan;
    data.users[user.id].subscriptionStatus = 'trialing';
    data.users[user.id].trialEndsAt = trialEnds.toISOString();
    saveData(data);

    return res.json({ message: 'Trial started', trialEndsAt: trialEnds.toISOString() });
  }

  // Create subscription flow
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
