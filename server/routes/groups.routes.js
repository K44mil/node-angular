const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createGroup } = require('../controllers/groups/createGroup');
const { getActiveGroups } = require('../controllers/groups/getGroups');
const { getGroup } = require('../controllers/groups/getGroup');

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

router.post('/', createGroup);
router.get('/active', getActiveGroups);
router.get('/:id', getGroup);

module.exports = router;