const asyncHandler = require("../../middleware/asyncHandler");
const Group = require("../../models/Group");
const UserGroup = require("../../models/relationsModels/UserGroup");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const Event = require('../../models/Event');
const { Op } = require('sequelize');
const Presence = require('../../models/Presence');

/**
 * @desc    Add User To Group
 * @route   POST /api/v1/groups/:id/add_members
 * @access  Private/Admin
 */
exports.addUsersToGroup = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one user.', 400)
        );
    }

    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );
    }

    const events = await Event.findAll({
        where: {
            groupId: {
                [Op.eq]: group.id
            }
        }
    });

    for (const id of ids) {
        const user = await User.findByPk(id);
        if (user) {
            const userGroup = await UserGroup.findOne({
                where: {
                    userId: {
                        [Op.eq]: user.id
                    },
                    groupId: {
                        [Op.eq]: group.id
                    }
                }
            });

            if (userGroup && userGroup.isConfirmed)
                continue;
            else if (userGroup && !userGroup.isConfirmed)
                await userGroup.destroy();

            await UserGroup.create({
                userId: user.id,
                groupId: group.id,
                isConfirmed: true
            });

            for (const e of events) {
                await Presence.create({
                    userId: user.id,
                    eventId: e.id
                });
            }
        }
    }

    res.status(200).json({
        success: true,
        data: { }
    });
});