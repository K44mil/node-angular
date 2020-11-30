const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Mark = require('../../models/Mark');
const User = require('../../models/User');
const { Op } = require('sequelize');
const Group = require('../../models/Group');

/**
 * @desc    Get My Marks in group
 * @route   GET /api/v1/marks/group/:id
 * @access  Private
 */
exports.getMyMarks = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (!user) {
        return next(
            new ErrorResponse('User does not exist.', 400)
        )
    }

    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }
    
    const marks = await Mark.findAll({
        where: {
            userId: {
                [Op.eq]: user.id
            },
            groupId: {
                [Op.eq]: group.id
            }
        }
    });
    
    res.status(200).json({
        success: true,
        data: {
            marks
        }
    });
});