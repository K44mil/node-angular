const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const Mark = require('../../models/Mark');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Update Mark
 * @route   PUT /api/v1/marks/:id
 * @access  Private/Admin
 */
exports.updateMark = asyncHandler(async (req, res, next) => {
    const { value, markDescriptionId } = req.body;

    const mark = await Mark.findByPk(req.params.id);
    if (!mark) {
        return next(
            new ErrorResponse('Mark does not exist.', 400)
        )
    }

    const markDesc = await MarkDescription.findByPk(markDescriptionId);
    if (!markDesc) {
        return next(
            new ErrorResponse('Mark Description does not exist.', 400)
        )
    }

    await mark.update({
        value,
        markDescriptionId: markDesc.id
    });

    res.status(200).json({
        success: true,
        data: { }
    });
});