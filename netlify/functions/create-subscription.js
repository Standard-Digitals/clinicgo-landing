const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(process.cwd(), 'data.json');

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (e) {
    console.log('Starting fresh');
  }
  return { users: {}, subscriptions: {}, licenses: {} };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

function generateLicenseKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = 'SDB-';
  for (let i = 0; i < 4; i++) key += chars[Math.floor(Math.random() * chars.length)];
  key += '-';
  for (let i = 0; i < 4; i++) key += chars[Math.floor(Math.random() * chars.length)];
  key += '-';
  for (let i = 0; i < 4; i++) key += chars[Math.floor(Math.random() * chars.length)];
  return key;
}

function authenticate(authHeader, data) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  try {
    const [id, email] = Buffer.from(token, 'base64').toString().split(':');
    const users = data.users || {};
    if (users[id] && users[id].email === email) return users[id];
  } catch (e) { return null; }
  return null;
}

function jsonResponse(status, body) {
  return { statusCode: status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }, body: JSON.stringify(body) };
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  
  try {
    const data = loadData();
    const user = authenticate(event.headers.Authorization, data);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });

    const { plan, paymentId } = JSON.parse(event.body || '{}');
    user.subscriptionStatus = 'active';
    user.subscriptionId = generateId();
    
    const subscriptionEnds = new Date();
    if (plan === 'yearly') subscriptionEnds.setFullYear(subscriptionEnds.getFullYear() + 1);
    else subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    user.subscriptionEndsAt = subscriptionEnds.toISOString();

    const licenseKey = generateLicenseKey();
    user.licenseKey = licenseKey;
    user.licensedDomains = [];
    data.licenses = data.licenses || {};
    data.licenses[licenseKey] = { userId: user.id, domain: '' };
    user.onboardingComplete = true;
    
    saveData(data);
    return jsonResponse(200, { message: 'Subscription created', subscriptionId: user.subscriptionId, licenseKey });
  } catch (e) {
    console.error('Create subscription error:', e);
    return jsonResponse(500, { message: 'Internal server error' });
  }
};