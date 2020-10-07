const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createFaculty } = require('../controllers/faculties/createFaculty');
const { deleteFaculty } = require('../controllers/faculties/deleteFaculty');
const { getFaculties } = require('../controllers/faculties/getFaculties');
const { getFaculty } = require('../controllers/faculties/getFaculty');
const { getVisibleFaculties } = require('../controllers/faculties/getVisibleFaculties');
const { updateFaculty } = require('../controllers/faculties/updateFaculty');

// GET
router.get('/visible', getVisibleFaculties);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getFaculties);
router.get('/:id', getFaculty);

// POST
router.post('/', createFaculty);

// PUT
router.put('/:id', updateFaculty);

// DELETE
router.delete('/:id', deleteFaculty);

module.exports = router;