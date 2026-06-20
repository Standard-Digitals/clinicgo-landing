import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData, saveData, authenticate } from '../helpers/lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = authenticate(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { plan } = req.body;
  if (!plan || (plan !== 'monthly' && plan !== 'yearly')) return res.status(400).json({ message: 'Valid plan required' });

  const data = loadData();
  data.users[user.id].plan = plan;
  saveData(data);

  res.json({ message: 'Plan changed', plan });
}
