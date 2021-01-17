const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const Mark = require('../../models/Mark');
const Group = require('../../models/Group');
const User = require('../../models/User');
const MarkDescription = require('../../models/MarkDescription');
const UserGroup = require('../../models/relationsModels/UserGroup');

/**
 * @desc    Create Mark
 * @route   POST /api/v1/marks/group/:id/add_mark
 * @access  Private/Admin
 */
exports.createMark = asyncHandler(async (req, res, next) => {
    const { id, value, final, markDescriptionId } = req.body;

    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }
    const user = await User.findByPk(id);
    if (!user)
        return next(new ErrorResponse('User does not exist.', 400));

    const userBelongsToGroup = await UserGroup.findOne({ where: { userId: { [Op.eq]: user.id }, isConfirmed: { [Op.eq]: 1 }}});
    if (!userBelongsToGroup)
        return next(new ErrorResponse('User does not belong to this group.', 400));

    if (!final) {
        const markDesc = await MarkDescription.findByPk(markDescriptionId);
        if (!markDesc) {
            return next(
                new ErrorResponse('Mark Description does not exist.', 400)
            )
        }
        await Mark.create({
            value,
            final: false,
            markDescriptionId: markDesc.id,
            userId: user.id,
            groupId: group.id
        });
    } 

    if (final && final === true) {
        const markExists = await Mark.findOne({
            where: {
                final: { [Op.eq]: 1 },
                userId: { [Op.eq]: user.id },
                groupId: { [Op.eq]: group.id }
            }
        });
    
        if (markExists)
            return next(new ErrorResponse('This user already has a final mark in this group.', 400));

        await Mark.create({
            value,
            final: true,
            markDescriptionId: null,
            userId: user.id,
            groupId: group.id
        });   
    }

    res.status(200).json({
        success: true,
        data: { }
    });
});