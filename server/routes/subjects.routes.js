const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createSubject } = require('../controllers/subjects/createSubject');
const { deleteSubject } = require('../controllers/subjects/deleteSubject');
const { getSubject } = require('../controllers/subjects/getSubject');
const { getSubjects } = require('../controllers/subjects/getSubjects');
const { getVisibleSubjects } = require('../controllers/subjects/getVisibleSubjects');
const { updateSubject } = require('../controllers/subjects/updateSubject');
const { archiveSubject } = require('../controllers/subjects/archiveSubject');
const { restoreSubject } = require('../controllers/subjects/restoreSubject');

// GET
router.get('/visible', getVisibleSubjects);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getSubjects);
router.get('/:id/archive', archiveSubject);
router.get('/:id/restore', restoreSubject);
router.get('/:id', getSubject);

// POST
router.post('/', createSubject);

// PUT
router.put('/:id', updateSubject);

// DELETE
router.delete('/:id', deleteSubject);

module.exports = router;