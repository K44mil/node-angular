const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const UserGroup = require('../../models/relationsModels/UserGroup');
const Event = require('../../models/Event');
const { Op } = require('sequelize');
const Presence = require('../../models/Presence');

/**
 * @desc    Get Student group details
 * @route   GET /api/v1/groups/my_groups/:id/details
 * @access  Private
 */
exports.getMyGroupDetails = asyncHandler(async (req, res, next) => {
    const user = req.user;

    let group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );
    }

    const membership = await UserGroup.findOne({
        where: {
            groupId: {
                [Op.eq]: group.id
            },
            userId: {
                [Op.eq]: user.id
            }
        }
    });

    if (!membership) {
        return next(
            new ErrorResponse('You do not belong to this group', 400)
        );
    }

    const events = await Event.findAll({
        where: {
            groupId: {
                [Op.eq]: group.id
            }
        },
        include: [
            {
                model: Presence,
                where: {
                    userId: {
                        [Op.eq]: user.id
                    }
                }
            }
        ],
        order: [['date', 'ASC']]
    });

    res.status(200).json({
        success: true,
        data: {
            events
        }
    });
});