const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { verifySuperAdmin } = require('../middleware/auth');

router.post('/create-table', verifySuperAdmin, tableController.createTable);

module.exports = router;