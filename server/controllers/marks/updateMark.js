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
    const { value, final, markDescriptionId } = req.body;

    const mark = await Mark.findByPk(req.params.id);
    if (!mark) {
        return next(
            new ErrorResponse('Mark does not exist.', 400)
        )
    }

    if (!final) {
        const markDesc = await MarkDescription.findByPk(markDescriptionId);
        if (!markDesc) {
            return next(
                new ErrorResponse('Mark Description does not exist.', 400)
            )
        }
    
        await mark.update({
            value,
            final: false,
            markDescriptionId: markDesc.id
        });
    }
   
    if (final && final === true) {
        const markExists = await Mark.findOne({
            where: {
                final: { [Op.eq]: 1 },
                userId: { [Op.eq]: mark.userId },
                groupId: { [Op.eq]: mark.groupId }
            }
        });

        if (markExists && markExists.id !== mark.id)
            return next(new ErrorResponse('Student already has a final mark in this group.', 400));

        await mark.update({
            value,
            final: true,
            markDescriptionId: null
        });
    }

    res.status(200).json({
        success: true,
        data: { }
    });
});