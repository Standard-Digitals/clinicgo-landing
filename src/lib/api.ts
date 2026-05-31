const API_BASE = import.meta.env.VITE_API_URL || '';

function getApiUrl(endpoint: string): string {
  return `${API_BASE}/api/${endpoint}`;
}

export const api = {
  signup: (data: { name: string; email: string; password: string; clinicName?: string; websiteUrl?: string; clinicType?: string }) =>
    fetch(getApiUrl('signup'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),

  login: (data: { email: string; password: string }) =>
    fetch(getApiUrl('login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),

  startTrial: (token: string, plan?: string) =>
    fetch(getApiUrl('start-trial'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ plan })
    }),

  createSubscription: (token: string, plan?: string, paymentId?: string) =>
    fetch(getApiUrl('create-subscription'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ plan, paymentId })
    }),

  razorpayCreateOrder: (token: string, plan?: string) =>
    fetch(getApiUrl('razorpay-create-order'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ plan })
    }),

  changePlan: (token: string, plan: string) =>
    fetch(getApiUrl('change-plan'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ plan })
    }),

  cancelSubscription: (token: string) =>
    fetch(getApiUrl('cancel-subscription'), {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }),

  activateLicense: (token: string, licenseKey: string, domain: string) =>
    fetch(getApiUrl('license-activate'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ licenseKey, domain })
    }),

  verifyLicense: (licenseKey: string, domain: string) =>
    fetch(`${getApiUrl('license-verify')}?licenseKey=${licenseKey}&domain=${domain}`),

  downloadPlugin: (token: string) =>
    fetch(getApiUrl('plugin-download'), {
      headers: { 'Authorization': `Bearer ${token}` }
    }),

  verifyWordPress: (url: string) =>
    fetch(getApiUrl('wp-verify'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    }),

  installPlugin: (token: string, websiteUrl: string) =>
    fetch(getApiUrl('wp-install-plugin'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ websiteUrl })
    }),
};

export default api;
