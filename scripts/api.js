let API_BASE_URL = (window.API_BASE_URL || 'http://localhost:4000');

async function ensureBase() {
  // Try current base; if health fails, attempt 4001
  try {
    await fetch(`${API_BASE_URL}/api/health`, { method: 'GET' });
  } catch {
    if (API_BASE_URL.includes(':4000')) {
      API_BASE_URL = API_BASE_URL.replace(':4000', ':4001');
    }
  }
}

async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  await ensureBase();
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || 'Request failed';
    throw new Error(msg);
  }
  return data;
}

window.api = { request: apiRequest, baseUrl: API_BASE_URL };
