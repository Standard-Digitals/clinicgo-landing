const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data.json');

function loadData() { try { if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); } catch (e) {} return { users: {}, subscriptions: {}, licenses: {} }; }
function saveData(data) { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); }
function authenticate(authHeader, data) { if (!authHeader || !authHeader.startsWith('Bearer ')) return null; try { const [id, email] = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return (data.users || {})[id] || null; } catch (e) { return null; } }
function jsonResponse(status, body) { return { statusCode: status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(body) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const data = loadData();
    const user = authenticate(event.headers.Authorization, data);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    user.subscriptionStatus = 'canceled';
    saveData(data);
    return jsonResponse(200, { message: 'Subscription canceled' });
  } catch (e) { return jsonResponse(500, { message: 'Internal server error' }); }
};