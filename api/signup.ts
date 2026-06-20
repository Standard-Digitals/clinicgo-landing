import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData, saveData, generateId, generateLicenseKey, createToken, bcrypt } from '../helpers/lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, password, clinicName, websiteUrl, clinicType } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
  if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });

  const data = loadData();

  for (const user of Object.values(data.users)) {
    if (user.email === email) return res.status(400).json({ message: 'Email already registered' });
  }

  const id = generateId();
  const hashedPassword = await bcrypt.hash(password, 10);
  const licenseKey = generateLicenseKey();
  const freeUntil = '2025-08-31T23:59:59.000Z';

  data.users[id] = {
    id, email, password: hashedPassword, name,
    clinicName: clinicName || '',
    websiteUrl: websiteUrl || '',
    clinicType: clinicType || '',
    plan: 'premium',
    subscriptionStatus: 'active',
    licenseKey,
    licensedDomains: [],
    onboardingComplete: false,
    createdAt: new Date().toISOString(),
    subscriptionEndsAt: freeUntil,
  };
  data.licenses[licenseKey] = { userId: id, domain: websiteUrl || '' };
  saveData(data);

  const token = createToken(id, email);

  res.json({
    token,
    user: { id, name, email, plan: 'premium', subscriptionStatus: 'active', licenseKey, subscriptionEndsAt: freeUntil, freeUntil, onboardingComplete: false, clinicName: clinicName || '', websiteUrl: websiteUrl || '' }
  });
}
