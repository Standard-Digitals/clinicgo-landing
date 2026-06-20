import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateId, authenticate } from './lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = authenticate(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { plan } = req.body;
  res.json({
    orderId: 'order_' + generateId(),
    keyId: process.env.RAZORPAY_KEY_ID || 'test_key_id',
    amount: plan === 'yearly' ? 49000 : 4900,
    currency: 'INR'
  });
}
