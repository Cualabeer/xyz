const express = require('express');
const router = express.Router();
const { verifySuperAdmin } = require('../middleware/auth');
const { getAllUsers, createUser } = require('../controllers/usersController');

router.get('/', verifySuperAdmin, getAllUsers);
router.post('/', verifySuperAdmin, createUser);

module.exports = router;