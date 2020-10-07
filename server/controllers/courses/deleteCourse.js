const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');

/**
 * @desc    Delete Course
 * @route   DELETE /api/v1/courses/:id
 * @access  Private/Admin
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findByPk(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`Cannot find Course with ID '${req.params.id}'.`, 400)
        );
    }
    await course.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});