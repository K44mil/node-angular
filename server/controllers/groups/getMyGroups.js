const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const UserGroup = require('../../models/relationsModels/UserGroup');
const { Op } = require('sequelize');

/**
 * @desc    Get Students groups
 * @route   GET /api/v1/groups/my_groups
 * @access  Private
 */
exports.getMyGroups = asyncHandler(async (req, res, next) => {
    const user = req.user;

    const groups = await UserGroup.findAll({
        where: {
            userId: {
                [Op.eq]: user.id
            }
        },
        include: [
            {
                model: Group,
                attributes: ['id', 'displayName']
            }
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            groups
        }
    })
});