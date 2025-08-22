const db = require('../db');

exports.getAllCustomers = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM customers ORDER BY id ASC');
  res.json(rows);
};

exports.createCustomer = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await db.query(
      'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3)',
      [name, email, phone]
    );
    res.json({ message: 'Customer created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    await db.query(
      'UPDATE customers SET name=$1, email=$2, phone=$3 WHERE id=$4',
      [name, email, phone, id]
    );
    res.json({ message: 'Customer updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM customers WHERE id=$1', [id]);
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};