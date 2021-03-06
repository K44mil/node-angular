const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const Mark = require('../../models/Mark');
const Group = require('../../models/Group');
const User = require('../../models/User');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Create Marks
 * @route   POST /api/v1/marks/group/:id
 * @access  Private/Admin
 */
exports.createMarks = asyncHandler(async (req, res, next) => {
    const { ids, value, final, markDescriptionId } = req.body;

    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }

    if (!final) {
        const markDesc = await MarkDescription.findByPk(markDescriptionId);
        if (!markDesc) {
            return next(
                new ErrorResponse('Mark Description does not exist.', 400)
            )
        }

        for (const id of ids) {
            const user = await User.findByPk(id);
            if (user) {
                await Mark.create({
                    value,
                    final: false,
                    markDescriptionId: markDesc.id,
                    userId: user.id,
                    groupId: group.id
                });
            }
        }
    } 

    if (final && final === true) {
        for (const id of ids) {
            const user = await User.findByPk(id);
            if (user) {
                const markExist = await Mark.findOne({
                    where: {
                        final: { [Op.eq]: 1 },
                        userId: { [Op.eq]: user.id },
                        groupId: { [Op.eq]: group.id }
                    }
                });

                if (!markExist)
                    await Mark.create({
                        value,
                        final: true,
                        markDescriptionId: null,
                        userId: user.id,
                        groupId: group.id
                    });
            }
        }
    }

    res.status(200).json({
        success: true,
        data: {
            
        }
    });
});