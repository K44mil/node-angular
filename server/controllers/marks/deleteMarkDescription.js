const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Delete Mark Description
 * @route   DELETE /api/v1/marks/descriptions/:id
 * @access  Private/Admin
 */
exports.deleteMarkDescription = asyncHandler(async (req, res, next) => {
    const markDesc = await MarkDescription.findByPk(req.params.id);
    if (!markDesc) {
        return next(
            new ErrorResponse('Mark description does not exist.', 400)
        )
    }

    await markDesc.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});