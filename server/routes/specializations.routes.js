const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createSpecialization } = require('../controllers/specializations/createSpecialization');
const { deleteSpecialization } = require('../controllers/specializations/deleteSpecialization');
const { getSpecialization } = require('../controllers/specializations/getSpecialization');
const { getSpecializations } = require('../controllers/specializations/getSpecializations');
const { getVisibleSpecializations } = require('../controllers/specializations/getVisibleSpecializations');
const { updateSpecialization } = require('../controllers/specializations/updateSpecialization');

// GET
router.get('/visible', getVisibleSpecializations);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getSpecializations);
router.get('/:id', getSpecialization);

// POST
router.post('/', createSpecialization);

// PUT
router.put('/:id', updateSpecialization);

// DELETE
router.delete('/:id', deleteSpecialization);

module.exports = router;