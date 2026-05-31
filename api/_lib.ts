import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'clinicgo-secret-key-change-in-production';
const DATA_FILE = path.join(process.cwd(), 'data.json');

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
  licenses: Record<string, { userId: string; domain: string }>;
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
