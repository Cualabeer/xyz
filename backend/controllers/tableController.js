const db = require('../db');

const tableSchemas = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(50)
    )
  `,
  customers: `
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      phone VARCHAR(20)
    )
  `,
  garage: `
    CREATE TABLE IF NOT EXISTS garage (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      location VARCHAR(255),
      staff_count INT
    )
  `
};

exports.createTable = async (req, res) => {
  const { tableName } = req.body;
  const sql = tableSchemas[tableName];
  if (!sql) return res.status(400).json({ error: 'Invalid table name' });

  try {
    await db.query(sql);
    res.json({ message: `${tableName} table created successfully!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};