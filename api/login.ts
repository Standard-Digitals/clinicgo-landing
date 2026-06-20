import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData, saveData, generateLicenseKey, createToken, bcrypt } from '../helpers/lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const data = loadData();
  let foundUser = Object.values(data.users).find(u => u.email === email);

  if (!foundUser) return res.status(401).json({ message: 'Invalid email or password' });

  const isValid = await bcrypt.compare(password, foundUser.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid email or password' });

  // Auto-generate license for users without one
  if (!foundUser.licenseKey) {
    const licenseKey = generateLicenseKey();
    foundUser.licenseKey = licenseKey;
    foundUser.plan = 'premium';
    foundUser.subscriptionStatus = 'active';
    foundUser.subscriptionEndsAt = '2025-08-31T23:59:59.000Z';
    data.licenses[licenseKey] = { userId: foundUser.id, domain: '' };
    saveData(data);
  }

  const token = createToken(foundUser.id, foundUser.email);

  res.json({
    token,
    user: {
      id: foundUser.id, name: foundUser.name, email: foundUser.email,
      plan: foundUser.plan, subscriptionStatus: foundUser.subscriptionStatus,
      licenseKey: foundUser.licenseKey, trialEndsAt: foundUser.trialEndsAt,
      subscriptionEndsAt: foundUser.subscriptionEndsAt,
      freeUntil: foundUser.subscriptionEndsAt,
      onboardingComplete: foundUser.onboardingComplete,
      clinicName: foundUser.clinicName || '',
      websiteUrl: foundUser.websiteUrl || '',
    }
  });
}
