const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createNote } = require('../controllers/notes/createNote');
const { updateNote } = require('../controllers/notes/updateNote');
const { deleteNote } = require('../controllers/notes/deleteNote');

// For Admin
router.use(protect, authorize(Role.Admin));

router.post('/', createNote);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote);

module.exports = router;