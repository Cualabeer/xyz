const db = require('../db');

const tableSchemas = {
  users: `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(50)
  )`,
  customers: `CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      phone VARCHAR(20)
  )`,
  garage: `CREATE TABLE IF NOT EXISTS garage (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      location VARCHAR(255),
      staff_count INT
  )`
};

exports.createTable = (req, res) => {
  const { tableName } = req.body;
  const sql = tableSchemas[tableName];
  if (!sql) return res.status(400).json({ error: 'Invalid table name' });

  db.query(sql, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `${tableName} table created successfully!` });
  });
};