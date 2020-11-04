const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createAnnouncement } = require('../controllers/announcements/createAnnouncement');
const { deleteAnnouncement } = require('../controllers/announcements/deleteAnnouncement');
const { updateAnnouncement } = require('../controllers/announcements/updateAnnouncement');
const { getAnnouncement } = require('../controllers/announcements/getAnnouncement');
const { getVisibleAnnouncements } = require('../controllers/announcements/getVisibleAnnouncements');
const { getAnnouncements } = require('../controllers/announcements/getAnnouncements');
const { changeVisibility } = require('../controllers/announcements/changeVisibility');

// GET
router.get('/visible', getVisibleAnnouncements);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/:id/change_visibility', changeVisibility);
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncement);

// POST
router.post('/', createAnnouncement);

// PUT
router.put('/:id', updateAnnouncement);

// DELETE
router.delete('/:id', deleteAnnouncement);

module.exports = router;