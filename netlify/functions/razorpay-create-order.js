const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(process.cwd(), 'data.json');

function loadData() { try { if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); } catch (e) {} return { users: {}, subscriptions: {}, licenses: {} }; }
function authenticate(authHeader, data) { if (!authHeader || !authHeader.startsWith('Bearer ')) return null; try { const [id, email] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return (data.users || {})[id] || null; } catch (e) { return null; } }
function generateId() { return crypto.randomBytes(16).toString('hex'); }
function jsonResponse(status, body) { return { statusCode: status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(body) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const data = loadData();
    const user = authenticate(event.headers.Authorization, data);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    const { plan } = JSON.parse(event.body || '{}');
    const amount = plan === 'yearly' ? 49000 : 4900;
    const orderId = 'order_' + generateId();
    const keyId = process.env.RAZORPAY_KEY_ID || 'test_key_id';
    return jsonResponse(200, { orderId, keyId, amount, currency: 'INR' });
  } catch (e) { return jsonResponse(500, { message: 'Internal server error' }); }
};