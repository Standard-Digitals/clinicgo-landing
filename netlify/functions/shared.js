const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

const defaultData = {
  users: {},
  subscriptions: {},
  licenses: {}
};

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
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
  for (let i = 0; i < 4; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  key += '-';
  for (let i = 0; i < 4; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  key += '-';
  for (let i = 0; i < 4; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

function authenticate(authHeader, data) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [id, email] = decoded.split(':');
    const user = data.users[id];
    if (user && user.email === email) {
      return user;
    }
  } catch (e) {
    return null;
  }
  return null;
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
  authenticate,
  response
};