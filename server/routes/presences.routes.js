const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { confirmPresence } = require('../controllers/presences/confirmPresence');

router.get('/:id/confirm', protect, confirmPresence);

module.exports = router;