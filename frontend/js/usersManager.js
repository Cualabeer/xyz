import { API_URL } from './appConfig.js';
import { getSuperAdminKey } from './authManager.js';

const tbody = document.getElementById('usersTable');

async function loadUsers() {
  const r = await fetch(`${API_URL}/users`, { headers: { 'super-admin-key': getSuperAdminKey() } });
  const data = await r.json();
  tbody.innerHTML = data.map(u => `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td></tr>`).join('');
}

async function createUser(d) {
  await fetch(`${API_URL}/users`, {
    method:'POST',
    headers:{'Content-Type':'application/json','super-admin-key':getSuperAdminKey()},
    body:JSON.stringify(d)
  });
}

document.getElementById('loadUsers').addEventListener('click', loadUsers);
document.getElementById('userForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target).entries());
  await createUser(d);
  e.target.reset();
  await loadUsers();
});