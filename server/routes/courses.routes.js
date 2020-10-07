const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createCourse } = require('../controllers/courses/createCourse');
const { deleteCourse } = require('../controllers/courses/deleteCourse');
const { getCourse } = require('../controllers/courses/getCourse');
const { getCourses } = require('../controllers/courses/getCourses');
const { getVisibleCourses } = require('../controllers/courses/getVisibleCourses');
const { updateCourse } = require('../controllers/courses/updateCourse');

// GET
router.get('/visible', getVisibleCourses);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/', getCourses);
router.get('/:id', getCourse);

// POST
router.post('/', createCourse);

// PUT
router.put('/:id', updateCourse);

// DELETE
router.delete('/:id', deleteCourse);

module.exports = router;