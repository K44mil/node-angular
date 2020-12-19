const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const { Op } = require('sequelize');

/**
 * @desc    Get Courses
 * @route   GET /api/v1/courses
 * @access  Private/Admin
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
    let options = {
        where: {}
    };
    
    const { isArchive } = req.query; 
    if (isArchive) options.where.isArchive = { [Op.eq]: isArchive };

    const courses = await Course.findAll(options);

    res.status(200).json({
        success: true,
        data: {
            courses
        }
    });
});