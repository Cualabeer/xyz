export function initTableManager(containerId, apiUrl, superAdminKey) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <h3>Table Management</h3>
        <select id="createTableSelect" class="form-select w-25 mb-2">
            <option value="users">Users</option>
            <option value="customers">Customers</option>
            <option value="garage">Garage</option>
        </select>
        <button id="createTableBtn" class="btn btn-primary mb-3">Create Table</button>
    `;

    const createBtn = container.querySelector('#createTableBtn');
    createBtn.addEventListener('click', async () => {
        const tableName = container.querySelector('#createTableSelect').value;
        const res = await fetch(`${apiUrl}/api/tables/create-table`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'super-admin-key': superAdminKey
            },
            body: JSON.stringify({ tableName })
        });
        const data = await res.json();
        alert(data.message || data.error);
    });
}