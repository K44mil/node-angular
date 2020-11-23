const asyncHandler = require("../../middleware/asyncHandler");
const User = require("../../models/User");
const { Op } = require('sequelize');
const UserGroup = require("../../models/relationsModels/UserGroup");

/**
 * @desc    Get group members
 * @route   GET /api/v1/groups/:id/members
 * @access  Private/Admin
 */
exports.getGroupMembers = asyncHandler(async (req, res, next) => {
    const members = await UserGroup.findAll({
        where: {
            groupId: {
                [Op.eq]: req.params.id
            },
            isConfirmed: {
                [Op.eq]: 1
            }
        },
        include: {
            model: User,
            attributes: ['firstName', 'lastName', 'albumNumber']
        },
    });

    res.status(200).json({
        success: true,
        data: {
            members
        }
    });
});