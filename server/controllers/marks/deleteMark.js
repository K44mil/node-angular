const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const Mark = require('../../models/Mark');

/**
 * @desc    Delete Mark
 * @route   DELETE /api/v1/marks/:id
 * @access  Private/Admin
 */
exports.deleteMark = asyncHandler(async (req, res, next) => {
    const mark = await Mark.findByPk(req.params.id);

    if (!mark) {
        return next(
            new ErrorResponse('Mark does not exist.', 400)
        )
    }

    await mark.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});