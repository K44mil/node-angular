const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createGroup } = require('../controllers/groups/createGroup');

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

router.post('/', createGroup);

module.exports = router;