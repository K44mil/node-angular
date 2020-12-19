const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Get Mark Description by id
 * @route   GET /api/v1/marks/descriptions/:id
 * @access  Private/Admin
 */
exports.getMarkDescription = asyncHandler(async (req, res, next) => {
    const markDesc = await MarkDescription.findByPk(req.params.id);
    if (!markDesc) {
        return next(
            new ErrorResponse('Mark description does not exist.', 400)
        )
    }

    res.status(200).json({
        success: true,
        data: { markDesc }
    });
});