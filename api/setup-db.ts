import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Protect with admin secret
  const secret = req.headers['x-admin-secret'] || req.query.secret;
  if (secret !== process.env.CG_ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cg_licences (
        id SERIAL PRIMARY KEY,
        licence_key VARCHAR(25) NOT NULL UNIQUE,
        email VARCHAR(200) NOT NULL,
        name VARCHAR(200) DEFAULT NULL,
        plan VARCHAR(20) NOT NULL DEFAULT 'monthly',
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        expiry_date DATE NOT NULL,
        max_activations INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS cg_activations (
        id SERIAL PRIMARY KEY,
        licence_id INT NOT NULL REFERENCES cg_licences(id) ON DELETE CASCADE,
        domain VARCHAR(253) NOT NULL,
        wp_version VARCHAR(20) DEFAULT NULL,
        plugin_version VARCHAR(20) DEFAULT NULL,
        active BOOLEAN NOT NULL DEFAULT true,
        activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deactivated_at TIMESTAMP DEFAULT NULL,
        last_verified TIMESTAMP DEFAULT NULL,
        UNIQUE (licence_id, domain)
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_activations_domain ON cg_activations(domain)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_activations_active ON cg_activations(active)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_licences_status ON cg_licences(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_licences_expiry ON cg_licences(expiry_date)`;

    return res.json({ success: true, message: 'Database tables created successfully.' });
  } catch (err: any) {
    console.error('setup-db error:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
}
