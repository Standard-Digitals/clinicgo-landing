import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authenticate } from '../helpers/lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const user = authenticate(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=sd-booking.zip');
  res.send(Buffer.from('placeholder plugin zip'));
}
