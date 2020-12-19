const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createMarks } = require('../controllers/marks/createMark');
const { deleteMark } = require('../controllers/marks/deleteMark');
const { updateMark } = require('../controllers/marks/updateMark');
const { getMark } = require('../controllers/marks/getMark');
const { getMyMarks } = require('../controllers/marks/getMyMarks');
const { createMarkDescription } = require('../controllers/marks/createMarkDescription');
const { getMarkDescriptions } = require('../controllers/marks/getMarkDescriptions');
const { getMarkDescription } = require('../controllers/marks/getMarkDescription');
const { updateMarkDescription } = require('../controllers/marks/updateMarkDescription');
const { deleteMarkDescription } = require('../controllers/marks/deleteMarkDescription');

// For Student
router.get('/group/:id', protect, authorize(Role.Student), getMyMarks);

// For Admin

// Mark Desc
router.post('/descriptions', protect, authorize(Role.Admin), createMarkDescription);
router.get('/descriptions', protect, authorize(Role.Admin), getMarkDescriptions);
router.get('/descriptions/:id', protect, authorize(Role.Admin), getMarkDescription);
router.put('/descriptions/:id', protect, authorize(Role.Admin), updateMarkDescription);
router.delete('/descriptions/:id', protect, authorize(Role.Admin), deleteMarkDescription);

router.post('/group/:id', protect, authorize(Role.Admin), createMarks);

router.delete('/:id', protect, authorize(Role.Admin), deleteMark);

router.put('/:id', protect, authorize(Role.Admin), updateMark);

router.get('/:id', protect, authorize(Role.Admin), getMark);



module.exports = router;