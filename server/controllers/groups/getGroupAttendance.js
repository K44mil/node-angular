const asyncHandler = require("../../middleware/asyncHandler");
const Event = require("../../models/Event");
const Presence = require("../../models/Presence");
const User = require("../../models/User");
const { Op } = require('sequelize');
const UserGroup = require("../../models/relationsModels/UserGroup");
const { sequelize } = require('../../config/db');
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
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'albumNumber'],
                include: [
                    {
                        model: Presence,
                        include: [
                            {
                                model: Event,
                                attributes: ['date']
                            }
                        ],
                        order: [Sequelize.literal('User.Presences.Event.date'), 'DESC']
                    }
                ]
            }
        ]
    });


    res.status(200).json({
        success: true,
        data: {
            members
        }
    });
});