const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Faculty = require('../../models/Faculty');

/**
 * @desc    Get Faculty by ID
 * @route   GET /api/v1/faculties/:id
 * @access  Private/Admin
 */
exports.getFaculty = asyncHandler(async (req, res, next) => {
    const faculty = await Faculty.findByPk(req.params.id);

    if (!faculty) {
        return next(
            new ErrorResponse(`Cannot find Faculty with ID '${req.params.id}'.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            faculty
        }
    });
});