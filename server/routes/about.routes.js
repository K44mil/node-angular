const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { getAboutPages } = require('../controllers/about/getAboutPages');
const { deleteAboutPage } = require('../controllers/about/deleteAboutPage');

// GET
router.get('/', getAboutPages);

// Delete
router.delete('/:id', protect, authorize(Role.Admin), deleteAboutPage);

module.exports = router;