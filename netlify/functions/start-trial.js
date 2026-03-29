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

function authenticate(authHeader, data) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [id, email] = decoded.split(':');
    const users = data.users || {};
    const user = users[id];
    if (user && user.email === email) {
      return user;
    }
  } catch (e) {
    return null;
  }
  return null;
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
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed' });
  }

  try {
    const data = loadData();
    const user = authenticate(event.headers.Authorization, data);

    if (!user) {
      return jsonResponse(401, { message: 'Unauthorized' });
    }

    const body = JSON.parse(event.body || '{}');
    const { plan } = body;

    if (!plan || (plan !== 'monthly' && plan !== 'yearly')) {
      return jsonResponse(400, { message: 'Valid plan required (monthly or yearly)' });
    }

    user.plan = plan;
    user.subscriptionStatus = 'trialing';

    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    user.trialEndsAt = trialEnds.toISOString();

    data.subscriptions = data.subscriptions || {};
    const subscriptionId = generateId();
    data.subscriptions[subscriptionId] = {
      id: subscriptionId,
      userId: user.id,
      plan,
      status: 'trialing',
      trialStart: new Date().toISOString(),
      trialEnds: trialEnds.toISOString()
    };

    saveData(data);

    return jsonResponse(200, {
      message: 'Trial started',
      trialEndsAt: trialEnds.toISOString(),
      subscriptionId
    });
  } catch (e) {
    console.error('Start trial error:', e);
    return jsonResponse(500, { message: 'Internal server error' });
  }
};