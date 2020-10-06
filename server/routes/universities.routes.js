const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createUniversity } = require('../controllers/universities/createUniversity');
const { updateUniversity } = require('../controllers/universities/updateUniversity');
const { getUniversities } = require('../controllers/universities/getUniversities');
const { getUniversity } = require('../controllers/universities/getUniversity');
const { deleteUniversity } = require('../controllers/universities/deleteUniversity');

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getUniversities);
router.get('/:id', getUniversity);

// POST
router.post('/', createUniversity);

// PUT
router.put('/:id', updateUniversity);

// DELETE
router.delete('/:id', deleteUniversity);

module.exports = router;