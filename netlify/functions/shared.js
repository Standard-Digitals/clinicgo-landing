const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const DATA_FILE = path.join('/tmp', 'data.json');
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'clinicgo-secret-key-change-in-production';

const defaultData = {
  users: {},
  subscriptions: {},
  licenses: {}
};

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (e) {
    console.log('No existing data, starting fresh');
  }
  return { ...defaultData };
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
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    if (i < 2) key += '-';
  }
  return key;
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function createToken(userId, email) {
  const payload = JSON.stringify({ id: userId, email, iat: Date.now() });
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64') + '.' + signature;
}

function verifyToken(token) {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const payload = Buffer.from(payloadB64, 'base64').toString();
    const expectedSig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');

    if (signature !== expectedSig) return null;
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

function authenticate(authHeader, data) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = data.users[decoded.id];
  if (user && user.email === decoded.email) return user;
  return null;
}

function findUserByEmail(data, email) {
  return Object.values(data.users).find(u => u.email === email) || null;
}

function response(status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(body)
  };
}

module.exports = {
  loadData,
  saveData,
  generateId,
  generateLicenseKey,
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  authenticate,
  findUserByEmail,
  response
};
