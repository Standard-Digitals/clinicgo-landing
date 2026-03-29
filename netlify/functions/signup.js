const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

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

function jsonResponse(status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async function(event) {
  console.log('Event:', JSON.stringify(event));
  
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return jsonResponse(400, { message: 'All fields are required' });
    }

    const data = loadData();

    for (const user of Object.values(data.users || {})) {
      if (user.email === email) {
        return jsonResponse(400, { message: 'Email already exists' });
      }
    }

    const id = generateId();
    const user = {
      id,
      email,
      password,
      name,
      plan: undefined,
      subscriptionStatus: undefined,
      licenseKey: undefined,
      licensedDomains: [],
      onboardingComplete: false,
      createdAt: new Date().toISOString()
    };

    data.users = data.users || {};
    data.users[id] = user;
    saveData(data);

    const token = Buffer.from(`${id}:${email}`).toString('base64');

    return jsonResponse(200, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        licenseKey: user.licenseKey,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (e) {
    console.error('Signup error:', e);
    return jsonResponse(500, { message: 'Internal server error' });
  }
};