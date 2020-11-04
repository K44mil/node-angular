const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createEvent } = require('../controllers/events/createEvent');
const { getEventsByGroupId } = require('../controllers/events/getEventsByGroupId');

router.post('/', protect, authorize(Role.Admin), createEvent);
router.get('/group/:id', protect, getEventsByGroupId);

module.exports = router;

