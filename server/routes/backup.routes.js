const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { getBackup } = require('../controllers/backup/getBackup');
const { createBackup } = require('../controllers/backup/createBackup');
const { restoreBackup } = require('../controllers/backup/restoreBackup');

// GET
router.get('/', protect, authorize(Role.Admin), getBackup);
router.get('/create', protect, authorize(Role.Admin), createBackup);
router.get('/restore', protect, authorize(Role.Admin), restoreBackup);

module.exports = router;