const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createMarks } = require('../controllers/marks/createMark');
const { deleteMark } = require('../controllers/marks/deleteMark');
const { updateMark } = require('../controllers/marks/updateMark');
const { getMark } = require('../controllers/marks/getMark');
const { getMyMarks } = require('../controllers/marks/getMyMarks');

// For Student
router.get('/group/:id', protect, authorize(Role.Student), getMyMarks);

// For Admin
router.post('/group/:id', protect, authorize(Role.Admin), createMarks);

router.delete('/:id', protect, authorize(Role.Admin), deleteMark);

router.put('/:id', protect, authorize(Role.Admin), updateMark);

router.get('/:id', protect, authorize(Role.Admin), getMark);

module.exports = router;