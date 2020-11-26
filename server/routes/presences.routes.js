const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { confirmPresence } = require('../controllers/presences/confirmPresence');
const { setUserPresent } = require('../controllers/presences/setUserPresent');
const { setUserAbsent } = require('../controllers/presences/setUserAbsent');
const { getPresence } = require('../controllers/presences/getPresence');

router.get('/:id/confirm', protect, confirmPresence);

// For Admin
router.get('/:id/present', protect, authorize(Role.Admin), setUserPresent);
router.get('/:id/absent', protect, authorize(Role.Admin), setUserAbsent);
router.get('/:id', protect, authorize(Role.Admin), getPresence);

module.exports = router;