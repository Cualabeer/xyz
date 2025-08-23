const express = require('express');
const router = express.Router();
const { verifySuperAdmin } = require('../middleware/auth');
const { getAllCustomers, createCustomer } = require('../controllers/customersController');

router.get('/', verifySuperAdmin, getAllCustomers);
router.post('/', verifySuperAdmin, createCustomer);

module.exports = router;