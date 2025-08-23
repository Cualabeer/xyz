const express = require('express');
const router = express.Router();
const { verifySuperAdmin } = require('../middleware/auth');
const { getAllGarage, createGarage } = require('../controllers/garageController');

router.get('/', verifySuperAdmin, getAllGarage);
router.post('/', verifySuperAdmin, createGarage);

module.exports = router;