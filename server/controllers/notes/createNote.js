const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Group = require('../../models/Group');
const StudentNote = require('../../models/StudentNote');
const { Op } = require('sequelize');

/**
 * @desc    Create Students Note
 * @route   POST /api/v1/notes
 * @access  Private/Admin
 */
exports.createNote = asyncHandler(async (req, res, next) => {
    const { text, userId, groupId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
        return next(
            new ErrorResponse('User does not exist.', 400)
        )
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }

    let studentNote = await StudentNote.findOne({
        where: {
            userId: { [Op.eq]: user.id },
            groupId: { [Op.eq]: group.id }
        }
    });
    if (studentNote) {
        return next(
            new ErrorResponse('Student note already exist.', 400)
        )
    }

    studentNote = await StudentNote.create({
        text: text,
        userId: user.id,
        groupId: group.id    
    });

    res.status(201).json({
        success: true,
        data: {
            studentNote
        }
    });
});