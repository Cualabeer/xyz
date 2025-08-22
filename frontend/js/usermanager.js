export function initUsersManager(containerId, apiUrl, superAdminKey) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <h3>Users Management</h3>
        <button id="loadUsersBtn" class="btn btn-secondary mb-2">Load Users</button>
        <table class="table table-striped">
            <thead><tr id="usersHeader"></tr></thead>
            <tbody id="usersBody"></tbody>
        </table>
    `;

    const loadBtn = container.querySelector('#loadUsersBtn');
    const header = container.querySelector('#usersHeader');
    const body = container.querySelector('#usersBody');

    loadBtn.addEventListener('click', async () => {
        const res = await fetch(`${apiUrl}/api/users`, {
            headers: { 'super-admin-key': superAdminKey }
        });
        const data = await res.json();
        if (!data.length) return;

        // Table headers
        header.innerHTML = '';
        Object.keys(data[0]).forEach(key => header.innerHTML += `<th>${key}</th>`);
        header.innerHTML += '<th>Actions</th>';

        // Table rows
        body.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.keys(row).forEach(key => tr.innerHTML += `<td><input type="text" value="${row[key]}" data-key="${key}"></td>`);
            tr.innerHTML += `<td>
                <button class="btn btn-sm btn-success save-btn">Save</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>`;
            body.appendChild(tr);

            // Save
            tr.querySelector('.save-btn').addEventListener('click', async () => {
                const updated = {};
                tr.querySelectorAll('input').forEach(input => updated[input.dataset.key] = input.value);
                const id = updated.id;
                delete updated.id;
                const res = await fetch(`${apiUrl}/api/users/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'super-admin-key': superAdminKey },
                    body: JSON.stringify(updated)
                });
                alert((await res.json()).message);
            });

            // Delete
            tr.querySelector('.delete-btn').addEventListener('click', async () => {
                const id = tr.querySelector('input[data-key="id"]').value;
                if (!confirm(`Delete user ${id}?`)) return;
                const res = await fetch(`${apiUrl}/api/users/${id}`, {
                    method: 'DELETE',
                    headers: { 'super-admin-key': superAdminKey }
                });
                alert((await res.json()).message);
                tr.remove();
            });
        });
    });
}