import type { VercelRequest, VercelResponse } from '@vercel/node';
import { loadData, saveData, authenticate } from './_lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = authenticate(req.headers.authorization);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { websiteUrl } = req.body;
  if (!websiteUrl) return res.status(400).json({ message: 'Website URL required' });

  const data = loadData();
  data.users[user.id].websiteUrl = websiteUrl;
  data.users[user.id].pluginInstalled = true;
  saveData(data);

  res.json({
    success: true, installed: true, activated: true,
    message: 'Plugin installation initiated',
    redirectUrl: `${websiteUrl.replace(/\/$/, '')}/wp-admin/admin.php?page=clinicgo-dashboard`
  });
}
