const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');

/**
 * @desc    Archive Course
 * @route   GET /api/v1/courses/:id/archive
 * @access  Private/Admin
 */
exports.archiveCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`Cannot find Course with ID '${req.params.id}'.`, 400)
        );
    }

    course.isArchive = true;
    await course.save();

    res.status(200).json({
        success: true,
        data: {
            course
        }
    });
});