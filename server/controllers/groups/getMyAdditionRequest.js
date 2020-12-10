const asyncHandler = require("../../middleware/asyncHandler");
const Group = require("../../models/Group");
const UserGroup = require('../../models/relationsModels/UserGroup');
const { Op } = require('sequelize');

/**
 * @desc    Get student addition requests
 * @route   GET /api/v1/groups/my_requests
 * @access  Private
 */
exports.getMyAdditionRequests = asyncHandler(async (req, res, next) => {
    const user = req.user;

    const additionRequests = await UserGroup.findAll({
        where: {
            isConfirmed: {
                [Op.eq]: 0
            },
            userId: {
                [Op.eq]: user.id
            }
        },
        include: {
            model: Group,
            attributes: ['displayName']
        }
    });

    res.status(200).json({
        success: true,
        data: {
            additionRequests
        }
    });
});