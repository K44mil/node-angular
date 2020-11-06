const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createEvent } = require('../controllers/events/createEvent');
const { getEventsByGroupId } = require('../controllers/events/getEventsByGroupId');
const { deleteEvent } = require('../controllers/events/deleteEvent');
const { updateEvent } = require('../controllers/events/updateEvent');
const { openEvent } = require('../controllers/events/openEvent');
const { closeEvent } = require('../controllers/events/closeEvent');

router.post('/', protect, authorize(Role.Admin), createEvent);
router.get('/group/:id', protect, getEventsByGroupId);

// Open & Close Event
router.get('/:id/open', protect, authorize(Role.Admin), openEvent);
router.get('/:id/close', protect, authorize(Role.Admin), closeEvent);

router.delete('/:id', protect, authorize(Role.Admin), deleteEvent);
router.put('/:id', protect, authorize(Role.Admin), updateEvent);

module.exports = router;

