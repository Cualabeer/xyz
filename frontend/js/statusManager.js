import { API_URL, SUPER_ADMIN_KEY } from './appConfig.js';

async function fetchDB() {
  const res = await fetch(`${API_URL}/api/status`, {
    headers: { 'super-admin-key': SUPER_ADMIN_KEY }
  });
  return res.json();
}

export async function renderStatus() {
  const root = document.getElementById('db-status');
  try {
    const s = await fetchDB();
    const db = s.dbConnected ? '<span class="text-success">Connected</span>' : '<span class="text-danger">Not connected</span>';
    const tables = Object.entries(s.tables || {})
      .map(([k, v]) => `<li class="${v === 'ready' ? 'text-success' : 'text-danger'}">${k}: ${v}</li>`).join('');
    root.innerHTML = `<p>Database: ${db}</p><ul>${tables}</ul>`;
  } catch (e) {
    root.innerHTML = `<p class="text-danger">Failed to fetch DB status</p>`;
  }
}

document.getElementById('refreshStatus').addEventListener('click', renderStatus);
document.addEventListener('DOMContentLoaded', renderStatus);