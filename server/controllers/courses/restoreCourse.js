const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');

/**
 * @desc    Restore Course
 * @route   GET /api/v1/courses/:id/restore
 * @access  Private/Admin
 */
exports.restoreCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`Cannot find Course with ID '${req.params.id}'.`, 400)
        );
    }

    course.isArchive = false;
    await course.save();

    res.status(200).json({
        success: true,
        data: {
            course
        }
    });
});