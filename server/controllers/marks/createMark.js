const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const Mark = require('../../models/Mark');
const Group = require('../../models/Group');
const User = require('../../models/User');

/**
 * @desc    Create Marks
 * @route   POST /api/v1/marks/group/:id
 * @access  Private/Admin
 */
exports.createMarks = asyncHandler(async (req, res, next) => {
    const { ids, value, description } = req.body;

    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }

    for (const id of ids) {
        const user = await User.findByPk(id);
        if (user) {
            await Mark.create({
                value,
                description,
                userId: user.id,
                groupId: group.id
            });
        }
    }

    res.status(200).json({
        success: true,
        data: {
            
        }
    });
});