const asyncHandler = require("../../middleware/asyncHandler");
const Event = require("../../models/Event");
const Presence = require("../../models/Presence");
const User = require("../../models/User");
const { Op } = require('sequelize');
const UserGroup = require("../../models/relationsModels/UserGroup");
const Sequelize = require('sequelize');

/**
 * @desc    Get group attendance
 * @route   GET /api/v1/groups/:id/attendance
 * @access  Private/Admin
 */
exports.getGroupAttendance = asyncHandler(async (req, res, next) => {
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
            include: [
                {
                    model: Presence,
                    attributes: {
                        include: [
                            [
                                Sequelize.literal('( SELECT `date` FROM `events` AS `Event` WHERE `User.Presences.eventId` = `Event`.`id`)'),
                                'eventDate'
                            ],
                            [
                                Sequelize.literal('( SELECT `name` FROM `events` AS `Event` WHERE `User.Presences.eventId` = `Event`.`id`)'),
                                'eventName'
                            ],
                        ]
                    },
                    include: [
                        {
                            model: Event,
                            where: {
                                groupId: {
                                    [Op.eq]: req.params.id
                                }
                            }
                        }
                    ]
                },
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