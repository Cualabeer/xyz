import { API_URL, SUPER_ADMIN_KEY } from './appConfig.js';
const tbody = document.getElementById('garageTable');

async function loadGarage() {
  const r = await fetch(`${API_URL}/api/garage`, { headers: { 'super-admin-key': SUPER_ADMIN_KEY } });
  const data = await r.json();
  tbody.innerHTML = data.map(g => `<tr><td>${g.id}</td><td>${g.name}</td><td>${g.location}</td><td>${g.staff_count}</td></tr>`).join('');
}

async function createGarage(d) {
  d.staff_count = parseInt(d.staff_count || '0', 10);
  await fetch(`${API_URL}/api/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'super-admin-key': SUPER_ADMIN_KEY },
    body: JSON.stringify(d)
  });
}

document.getElementById('loadGarage').addEventListener('click', loadGarage);
document.getElementById('garageForm').addEventListener('submit', async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target).entries());
  await createGarage(d);
  e.target.reset();
  await loadGarage();
});