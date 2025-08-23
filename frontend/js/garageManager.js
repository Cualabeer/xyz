import { API_URL } from './appConfig.js';
import { getSuperAdminKey } from './authManager.js';

const tbody = document.getElementById('garageTable');

async function loadGarage() {
  const r = await fetch(`${API_URL}/garage`, { headers: { 'super-admin-key': getSuperAdminKey() } });
  const data = await r.json();
  tbody.innerHTML = data.map(g=>`<tr><td>${g.id}</td><td>${g.name}</td><td>${g.location}</td><td>${g.staff_count}</td></tr>`).join('');
}

async function createGarage(d){
  d.staff_count = parseInt(d.staff_count||'0',10);
  await fetch(`${API_URL}/garage`,{
    method:'POST',
    headers:{'Content-Type':'application/json','super-admin-key':getSuperAdminKey()},
    body:JSON.stringify(d)
  });
}

document.getElementById('loadGarage').addEventListener('click',loadGarage);
document.getElementById('garageForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target).entries());
  await createGarage(d);
  e.target.reset();
  await loadGarage();
});