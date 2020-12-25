const asyncHandler = require("../../middleware/asyncHandler");
const Event = require("../../models/Event");
const Presence = require("../../models/Presence");
const User = require("../../models/User");
const { Op } = require('sequelize');
const UserGroup = require("../../models/relationsModels/UserGroup");
const Sequelize = require('sequelize');
const Group = require("../../models/Group");
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Get group attendance
 * @route   GET /api/v1/groups/:id/attendance
 * @access  Private/Admin
 */
exports.getGroupAttendance = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );
    }

    const students = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'albumNumber'],
        include: [{
            model: UserGroup,
            where: {
                groupId: { [Op.eq]: group.id },
                isConfirmed: { [Op.eq]: 1 } 
            }
        }],
        order: [
            ['lastName', 'ASC'],
            ['firstName', 'ASC']
        ]
    });

    const events = await Event.findAll({
        where: {
            groupId: { [Op.eq]: group.id }
        }
    });
    
    const eventsIds = [];
    for (const e of events) {
        eventsIds.push(e.id);
    }

    const members = [];
    for (const s of students) {
        const m = s.toJSON();
        m.presences = await Presence.findAll({
            where: {
                userId: { [Op.eq]: s.id },
                eventId: { [Op.in]: eventsIds } 
            },
            include: [
                { 
                    model: Event,
                    attributes: ['date']
                }
            ],
            order: [[Event, 'date', 'ASC']]
        });
        members.push(m);
        delete m.UserGroups;
    }

    res.status(200).json({
        success: true,
        data: {
            members
        }
    });
});