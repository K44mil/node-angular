const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');

/**
 * @desc    Get Course by ID
 * @route   GET /api/v1/courses/:id
 * @access  Private/Admin
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`Cannot find Course with ID '${req.params.id}'.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            course
        }
    });
});