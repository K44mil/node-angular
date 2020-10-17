const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const Faculty = require('../../models/Faculty');

/**
 * @desc    Get Courses
 * @route   GET /api/v1/courses
 * @access  Private/Admin
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll({
        include: [
            {
                model: Faculty
            }
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            courses
        }
    });
});