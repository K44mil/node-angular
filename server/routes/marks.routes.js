const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createMarks } = require('../controllers/marks/createMark');

// For Admin
router.post('/group/:id', protect, authorize(Role.Admin), createMarks);

module.exports = router;