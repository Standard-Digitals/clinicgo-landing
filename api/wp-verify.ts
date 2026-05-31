import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  const cleanUrl = url.replace(/\/$/, '');
  let isWordPress = false, hasWpAdmin = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const wpRes = await fetch(`${cleanUrl}/wp-json/wp/v2/`, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeout);
    if (wpRes.ok || wpRes.status === 401) isWordPress = true;
  } catch {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const wpRes = await fetch(`${cleanUrl}/wp-login.php`, { method: 'HEAD', signal: controller.signal });
      clearTimeout(timeout);
      if (wpRes.ok || wpRes.status === 302) isWordPress = true;
    } catch {}
  }

  if (isWordPress) hasWpAdmin = true;
  res.json({ isWordPress, hasWpAdmin, url: cleanUrl });
}
