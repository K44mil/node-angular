const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');
const { getUsers } = require('../controllers/users/getUsers');
const { getUser } = require('../controllers/users/getUser');
const { createUser } = require('../controllers/users/createUser'); 
const { verifyUser } = require('../controllers/users/verifyUser');
const { blockUser } = require('../controllers/users/blockUser');
const { unblockUser } = require('../controllers/users/unblockUser');

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getUsers);
router.get('/verify/:id', verifyUser);
router.get('/block/:id', blockUser);
router.get('/unblock/:id', unblockUser);

router.post('/', createUser);

module.exports = router;