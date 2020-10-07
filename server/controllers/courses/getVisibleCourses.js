const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const { Op } = require('sequelize');

/**
 * @desc    Get Visible Courses
 * @route   GET /api/v1/courses/visible
 * @access  Public
 */
exports.getVisibleCourses = asyncHandler(async (req, res, next) => {
    const courses =  await Course.findAll({
        where: {
            isVisible: {
                [Op.eq]: 1
            }
        }
    });

    res.status(200).json({
        success: true,
        data: {
            courses
        }
    });
});