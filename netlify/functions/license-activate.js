const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

function loadData() { try { if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); } catch (e) {} return { users: {}, subscriptions: {}, licenses: {} }; }
function saveData(data) { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); }
function authenticate(authHeader, data) { if (!authHeader || !authHeader.startsWith('Bearer ')) return null; try { const parts = Buffer.from(authHeader.substring(7), 'base64').toString().split(':'); return (data.users || {})[parts[0]] || null; } catch (e) { return null; } }
function jsonResponse(status, body) { return { statusCode: status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(body) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'POST') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const data = loadData();
    const user = authenticate(event.headers.Authorization, data);
    if (!user) return jsonResponse(401, { message: 'Unauthorized' });
    const { licenseKey, domain } = JSON.parse(event.body || '{}');
    if (!licenseKey || !domain) return jsonResponse(400, { message: 'License key and domain required' });
    const licenses = data.licenses || {};
    const lic = licenses[licenseKey];
    if (!lic || lic.userId !== user.id) return jsonResponse(400, { message: 'Invalid license key' });
    licenses[licenseKey] = { userId: user.id, domain };
    user.licensedDomains = [...(user.licensedDomains || []), domain];
    saveData(data);
    return jsonResponse(200, { message: 'License activated', domain });
  } catch (e) { return jsonResponse(500, { message: 'Internal server error' }); }
};