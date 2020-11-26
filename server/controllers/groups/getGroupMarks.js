const asyncHandler = require("../../middleware/asyncHandler");
const Mark = require('../../models/Mark');
const User = require("../../models/User");
const { Op } = require('sequelize');
const UserGroup = require("../../models/relationsModels/UserGroup");
const Sequelize = require('sequelize');

/**
 * @desc    Get group marks
 * @route   GET /api/v1/groups/:id/marks
 * @access  Private/Admin
 */
exports.getGroupMarks = asyncHandler(async (req, res, next) => {
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
            attributes: ['id', 'firstName', 'lastName', 'albumNumber'],
            include: [
                {
                    model: Mark
                }
            ]
        },
        order: [
            [User, 'lastName', 'ASC']
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            members
        }
    });
});