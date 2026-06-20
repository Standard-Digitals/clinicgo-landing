import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { parse as parseQS } from 'querystring';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'clinicgo-secret-key-change-in-production';
const CG_LICENCE_SECRET = process.env.CG_LICENCE_SECRET || 'cg-licence-hmac-secret-change-in-production';
const DATA_FILE = path.join(process.cwd(), 'data.json');

// ═══════════════════════════════════════════════════════════════════════════
// JSON file storage (used by login, signup, subscription endpoints)
// ═══════════════════════════════════════════════════════════════════════════

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  clinicName?: string;
  websiteUrl?: string;
  clinicType?: string;
  plan?: string;
  subscriptionStatus?: string;
  subscriptionId?: string;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  licenseKey?: string;
  licensedDomains?: string[];
  onboardingComplete?: boolean;
  pluginInstalled?: boolean;
  createdAt: string;
}

interface DataStore {
  users: Record<string, User>;
  subscriptions: Record<string, any>;
  licenses: Record<string, any>;
}

export function loadData(): DataStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return { users: {}, subscriptions: {}, licenses: {} };
}

export function saveData(data: DataStore) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function generateId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = 'CGO-';
  for (let g = 0; g < 3; g++) {
    for (let i = 0; i < 4; i++) key += chars[Math.floor(Math.random() * chars.length)];
    if (g < 2) key += '-';
  }
  return key;
}

export function createToken(userId: string, email: string): string {
  const payload = JSON.stringify({ id: userId, email, iat: Date.now() });
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64') + '.' + signature;
}

export function verifyToken(token: string): { id: string; email: string } | null {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;
    const payload = Buffer.from(payloadB64, 'base64').toString();
    const expectedSig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    if (signature !== expectedSig) return null;
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function authenticate(authHeader: string | undefined): User | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const decoded = verifyToken(authHeader.substring(7));
  if (!decoded) return null;
  const data = loadData();
  const user = data.users[decoded.id];
  if (user && user.email === decoded.email) return user;
  return null;
}

export { bcrypt };

// ═══════════════════════════════════════════════════════════════════════════
// LICENCE SYSTEM — Neon Postgres
// ═══════════════════════════════════════════════════════════════════════════

function getSQL() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
  if (!url) throw new Error('Missing POSTGRES_URL or DATABASE_URL env var');
  return neon(url);
}

export interface LicenceRecord {
  id: number;
  licence_key: string;
  email: string;
  name: string | null;
  plan: string;
  status: string;
  expiry_date: string;
  max_activations: number;
  created_at: string;
}

export interface Activation {
  id: number;
  licence_id: number;
  domain: string;
  wp_version: string | null;
  plugin_version: string | null;
  active: boolean;
  activated_at: string;
  deactivated_at: string | null;
  last_verified: string | null;
}

export function normalizeDomain(domain: string): string {
  if (!domain) return '';
  let d = domain.toLowerCase().trim();
  d = d.replace(/^https?:\/\//, '');
  d = d.replace(/^www\./, '');
  d = d.replace(/\/+$/, '');
  return d;
}

export function parseLicenceBody(req: any): { licence_key: string; domain: string; wp_version: string; plugin_ver: string } {
  let body = req.body;
  if (Buffer.isBuffer(body)) body = body.toString('utf-8');
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = parseQS(body); }
  }
  if (!body || typeof body !== 'object') body = {};
  return {
    licence_key: (body.licence_key || body.licenseKey || body.license_key || '').toString().toUpperCase().trim(),
    domain: normalizeDomain((body.domain || '').toString()),
    wp_version: (body.wp_version || '').toString(),
    plugin_ver: (body.plugin_ver || '').toString(),
  };
}

export async function findLicence(licenceKey: string): Promise<LicenceRecord | null> {
  const sql = getSQL();
  const rows = await sql`
    SELECT id, licence_key, email, name, plan, status,
           TO_CHAR(expiry_date, 'YYYY-MM-DD') as expiry_date,
           max_activations, created_at
    FROM cg_licences WHERE licence_key = ${licenceKey} LIMIT 1
  `;
  if (!rows.length) return null;
  return rows[0] as LicenceRecord;
}

export async function getActiveDomainCount(licenceId: number): Promise<number> {
  const sql = getSQL();
  const rows = await sql`
    SELECT COUNT(*) as count FROM cg_activations WHERE licence_id = ${licenceId} AND active = true
  `;
  return parseInt(rows[0]?.count || '0');
}

export async function findActivation(licenceId: number, domain: string): Promise<Activation | null> {
  const sql = getSQL();
  const rows = await sql`
    SELECT * FROM cg_activations WHERE licence_id = ${licenceId} AND domain = ${domain} LIMIT 1
  `;
  if (!rows.length) return null;
  return rows[0] as Activation;
}

export async function activateDomain(licenceId: number, domain: string, wpVersion?: string, pluginVersion?: string): Promise<void> {
  const sql = getSQL();
  await sql`
    INSERT INTO cg_activations (licence_id, domain, wp_version, plugin_version, active, activated_at)
    VALUES (${licenceId}, ${domain}, ${wpVersion || null}, ${pluginVersion || null}, true, NOW())
    ON CONFLICT (licence_id, domain)
    DO UPDATE SET active = true, activated_at = NOW(), wp_version = ${wpVersion || null}, plugin_version = ${pluginVersion || null}, deactivated_at = NULL
  `;
}

export async function deactivateDomain(licenceId: number, domain: string): Promise<void> {
  const sql = getSQL();
  await sql`
    UPDATE cg_activations SET active = false, deactivated_at = NOW()
    WHERE licence_id = ${licenceId} AND domain = ${domain}
  `;
}

export async function updateLastVerified(licenceId: number, domain: string, pluginVersion?: string): Promise<void> {
  const sql = getSQL();
  await sql`
    UPDATE cg_activations SET last_verified = NOW(), plugin_version = COALESCE(${pluginVersion || null}, plugin_version)
    WHERE licence_id = ${licenceId} AND domain = ${domain} AND active = true
  `;
}

export function getLicenceStatus(licence: LicenceRecord): string {
  if (licence.status === 'suspended') return 'suspended';
  const now = Math.floor(Date.now() / 1000);
  const expiryTs = Math.floor(new Date(licence.expiry_date + 'T23:59:59Z').getTime() / 1000);
  const graceEndsTs = expiryTs + (7 * 86400);
  if (now <= expiryTs) return 'active';
  if (now <= graceEndsTs) return 'grace';
  return 'expired';
}

export function getFeaturesForPlan(plan: string) {
  return {
    inventory: true, invoices: true, whatsapp: true, sms: true,
    google_calendar: true, ms_calendar: true, multi_staff: true,
    reports: true, max_bookings_per_month: 9999,
  };
}

export function buildLicenceResponse(licence: LicenceRecord, status: string): any {
  const expiryTs = Math.floor(new Date(licence.expiry_date + 'T23:59:59Z').getTime() / 1000);
  const features = getFeaturesForPlan(licence.plan);
  const response: any = {
    success: true, status, plan: 'professional',
    expiry_date: licence.expiry_date, expiry_ts: expiryTs,
    name: licence.name || '', email: licence.email, max_users: 5,
    renewal_url: 'https://www.clinicgo.io/billing', features,
  };
  if (status === 'grace') response.grace_ends_ts = expiryTs + (7 * 86400);
  return response;
}

export function signResponse(data: object): string {
  return crypto.createHmac('sha256', CG_LICENCE_SECRET).update(JSON.stringify(data)).digest('hex');
}
