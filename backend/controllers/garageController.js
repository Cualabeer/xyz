const db = require('../db');

exports.getAllGarage = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM garage ORDER BY id ASC');
  res.json(rows);
};

exports.createGarage = async (req, res) => {
  const { name, location, staff_count } = req.body;
  try {
    await db.query(
      'INSERT INTO garage (name, location, staff_count) VALUES ($1, $2, $3)',
      [name, location, staff_count]
    );
    res.json({ message: 'Garage created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGarage = async (req, res) => {
  const { id } = req.params;
  const { name, location, staff_count } = req.body;
  try {
    await db.query(
      'UPDATE garage SET name=$1, location=$2, staff_count=$3 WHERE id=$4',
      [name, location, staff_count, id]
    );
    res.json({ message: 'Garage updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGarage = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM garage WHERE id=$1', [id]);
    res.json({ message: 'Garage deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};