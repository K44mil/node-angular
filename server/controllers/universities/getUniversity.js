const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const University = require('../../models/University');

/**
 * @desc    Get University by ID
 * @route   GET /api/v1/universities/:id
 * @access  Private/Admin
 */
exports.getUniversity = asyncHandler(async (req, res, next) => {
    const university = await University.findByPk(req.params.id);

    if (!university) {
        return next(
            new ErrorResponse(`Cannot find University with ID '${req.params.id}'.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            university
        }
    });
});