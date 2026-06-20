import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

const ADMIN_SECRET = process.env.CG_ADMIN_SECRET || 'admin-secret-change-this';

function generateKey(): string {
  return 'CG-' +
    crypto.randomBytes(3).toString('hex').toUpperCase() + '-' +
    crypto.randomBytes(3).toString('hex').toUpperCase() + '-' +
    crypto.randomBytes(3).toString('hex').toUpperCase();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  // Auth — check admin secret
  const authHeader = req.headers['x-admin-secret'] || req.body?.admin_secret;
  if (authHeader !== ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const email = (req.body.email || '').toString().trim();
  const name = (req.body.name || '').toString().trim();
  const plan = ['monthly', 'yearly'].includes(req.body.plan) ? req.body.plan : 'monthly';
  const maxActivations = parseInt(req.body.max_activations) || 1;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  // Calculate expiry
  const months = plan === 'yearly' ? 12 : 1;
  const expiry = req.body.custom_expiry || new Date(Date.now() + months * 30 * 86400 * 1000).toISOString().split('T')[0];

  try {
    // Generate unique key (retry up to 10 times)
    let key = generateKey();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await sql`SELECT id FROM cg_licences WHERE licence_key = ${key}`;
      if (existing.rows.length === 0) break;
      key = generateKey();
      attempts++;
    }

    // Insert
    await sql`
      INSERT INTO cg_licences (licence_key, email, name, plan, status, expiry_date, max_activations)
      VALUES (${key}, ${email}, ${name || null}, ${plan}, 'active', ${expiry}, ${maxActivations})
    `;

    return res.json({
      success: true,
      licence_key: key,
      email,
      name: name || null,
      plan,
      expiry_date: expiry,
      max_activations: maxActivations,
      message: 'Licence key generated successfully.'
    });
  } catch (err: any) {
    console.error('license-generate error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to generate licence key.' });
  }
}
