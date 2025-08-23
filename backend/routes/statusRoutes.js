const express = require('express');
const router = express.Router();
const { verifySuperAdmin } = require('../middleware/auth');
const { getStatus } = require('../controllers/statusController');

router.get('/', verifySuperAdmin, getStatus);

module.exports = router;