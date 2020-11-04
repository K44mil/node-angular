const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');
const { getUsers } = require('../controllers/users/getUsers');
const { getUser } = require('../controllers/users/getUser');
const { createUser } = require('../controllers/users/createUser'); 
const { verifyUser } = require('../controllers/users/verifyUser');

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getUsers);
router.get('/verify/:id', verifyUser);

router.post('/', createUser);

module.exports = router;