const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { getAboutPages } = require('../controllers/about/getAboutPages');
const { deleteAboutPage } = require('../controllers/about/deleteAboutPage');
const { createAboutPage } = require('../controllers/about/createAboutPage');
const { getAboutPage } = require('../controllers/about/getAboutPage');
const { increasePriority } = require('../controllers/about/increasePriority');
const { decreasePriority } = require('../controllers/about/decreasePriority');

// GET
router.get('/', getAboutPages);

// Delete
router.delete('/:id', protect, authorize(Role.Admin), deleteAboutPage);

// POST
router.post('/', protect, authorize(Role.Admin), createAboutPage);

router.get('/:id/increase_priority', protect, authorize(Role.Admin), increasePriority);
router.get('/:id/decrease_priority', protect, authorize(Role.Admin), decreasePriority);
router.get('/:id', protect, authorize(Role.Admin), getAboutPage);

module.exports = router;