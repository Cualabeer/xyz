import { API_URL, SUPER_ADMIN_KEY } from './appConfig.js';
const tbody = document.getElementById('customersTable');

async function loadCustomers() {
  const r = await fetch(`${API_URL}/api/customers`, { headers: { 'super-admin-key': SUPER_ADMIN_KEY } });
  const data = await r.json();
  tbody.innerHTML = data.map(c => `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td></tr>`).join('');
}

async function createCustomer(d) {
  await fetch(`${API_URL}/api/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'super-admin-key': SUPER_ADMIN_KEY },
    body: JSON.stringify(d)
  });
}

document.getElementById('loadCustomers').addEventListener('click', loadCustomers);
document.getElementById('customerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target).entries());
  await createCustomer(d);
  e.target.reset();
  await loadCustomers();
});