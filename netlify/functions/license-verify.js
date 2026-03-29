const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

function loadData() { try { if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); } catch (e) {} return { users: {}, subscriptions: {}, licenses: {} }; }
function jsonResponse(status, body) { return { statusCode: status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(body) }; }

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(200, { ok: true });
  if (event.httpMethod !== 'GET') return jsonResponse(405, { message: 'Method not allowed' });
  try {
    const params = event.queryStringParameters || {};
    const { licenseKey, domain } = params;
    if (!licenseKey || !domain) return jsonResponse(400, { message: 'License key and domain required' });
    const data = loadData();
    const licenses = data.licenses || {};
    const lic = licenses[licenseKey];
    if (!lic || lic.domain !== domain) return jsonResponse(400, { valid: false, message: 'Invalid or expired license' });
    return jsonResponse(200, { valid: true, message: 'License is valid' });
  } catch (e) { return jsonResponse(500, { message: 'Internal server error' }); }
};