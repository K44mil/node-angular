const asyncHandler = require("../../middleware/asyncHandler");
const Group = require("../../models/Group");
const UserGroup = require("../../models/relationsModels/UserGroup");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const Event = require('../../models/Event');
const { Op } = require('sequelize');
const Presence = require('../../models/Presence');

/**
 * @desc    Remove User from Group
 * @route   GET /api/v1/groups/members/:id/remove
 * @access  Private/Admin
 */
exports.removeUserFromGroup = asyncHandler(async (req, res, next) => {
    const userGroup = await UserGroup.findByPk(req.params.id);

    if (!userGroup) {
        return next(
            new ErrorResponse('User do not belongs to this group.', 400)
        );
    }

    const group = await Group.findByPk(userGroup.groupId);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist', 400)
        );
    }

    const user = await User.findByPk(userGroup.userId);
    if (!user) {
        return next(
            new ErrorResponse('User does not exist', 400)
        );
    }

    const events = await Event.findAll({
        where: {
            groupId: {
                [Op.eq]: group.id
            }
        }
    });

    console.log(events);

    // Delete Presences assigned to user and group
    for (const e of events) {
        const presence = await Presence.findOne({
            where: {
                userId: {
                    [Op.eq]: user.id
                },
                eventId: {
                    [Op.eq]: e.id
                }
            }
        });
        if (presence) {
            console.log(presence);
            await presence.destroy();
        }
    }

    await userGroup.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});