const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createDepartment } = require('../controllers/departments/createDepartment');
const { deleteDepartment } = require('../controllers/departments/deleteDepartment');
const { getDepartments } = require('../controllers/departments/getDepartments');
const { getDepartment } = require('../controllers/departments/getDepartment');
const { updateDepartment } = require('../controllers/departments/updateDepartment');
const { getVisibleDepartments } = require('../controllers/departments/getVisibleDepartments');

// GET
router.get('/visible', getVisibleDepartments);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getDepartments);
router.get('/:id', getDepartment);

// POST
router.post('/', createDepartment);

// PUT
router.put('/:id', updateDepartment);

// DELETE
router.delete('/:id', deleteDepartment);

module.exports = router;