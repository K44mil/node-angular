const asyncHandler = require("../../middleware/asyncHandler");
const Group = require("../../models/Group");
const ErrorResponse = require("../../utils/ErrorResponse");
const UserGroup = require('../../models/relationsModels/UserGroup');
const User = require("../../models/User");
const { Op } = require('sequelize');

/**
 * @desc    Get students wanted to join group
 * @route   GET /api/v1/group/:id/requests
 * @access  Private/Admin
 */
exports.getGroupAdditionRequests = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return next(
            new ErrorResponse('Group does not exist', 400)
        );
    }

    const additionRequests = await UserGroup.findAll({
        where: {
            isConfirmed: {
                [Op.eq]: 0
            },
            groupId: {
                [Op.eq]: group.id
            }
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'albumNumber']
        }
    });

    res.status(200).json({
        success: true,
        data: {
            additionRequests
        }
    });
});