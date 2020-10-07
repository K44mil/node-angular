const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');

/**
 * @desc    Create Course
 * @route   POST /api/v1/courses
 * @access  Private/Admin
 */
exports.createCourse = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    const course = await Course.build({
        name,
        short,
        isVisible
    });
    await course.save();

    res.status(201).json({
        success: true,
        data: {
            course
        }
    });
});