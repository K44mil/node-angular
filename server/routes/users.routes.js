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
const { deleteUser } = require('../controllers/users/deleteUser');
const { deleteManyUsers } = require('../controllers/users/deleteManyUsers');
const { blockManyUsers } = require('../controllers/users/blockManyUsers');
const { activateManyUsers } = require('../controllers/users/activateManyUsers');
const { unblockManyUsers } = require('../controllers/users/unblockManyUsers');
const { updateUser } = require('../controllers/users/updateUser');

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getUsers);
router.get('/verify/:id', verifyUser);
router.get('/block/:id', blockUser);
router.get('/unblock/:id', unblockUser);
router.get('/:id', getUser);

// DELETE
router.delete('/:id', deleteUser);

// POST
router.post('/', createUser);
router.post('/delete_many', deleteManyUsers);
router.post('/block_many', blockManyUsers);
router.post('/activate_many', activateManyUsers);
router.post('/unblock_many', unblockManyUsers);

// PUT
router.put('/:id', updateUser);

module.exports = router;