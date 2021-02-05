const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Event = require('../../models/Event');
const Group = require('../../models/Group');
const Presence = require('../../models/Presence');
const UserGroup = require('../../models/relationsModels/UserGroup');
const { Op } = require('sequelize');

/**
 * @desc    Create Event
 * @route   POST /api/v1/events
 * @access  Private/Admin
 */
exports.createEvent = asyncHandler(async (req, res, next) => {
    const { name, date, groupId } = req.body;
    
    if (!name || name === '' || !date || date === '')
        return next(
            new ErrorResponse('Event name and date are required.', 400)
        );

    if (name.length > 50)
            return next(new ErrorResponse('Event name cannot be longer than 50 characters.', 400));

    const group = await Group.findByPk(groupId);
    if (!group)
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );

    let event = await Event.findOne({
        where: {
            groupId: { [Op.eq]: group.id },
            date: { [Op.eq]: date }
        }
    });

    if (event)
        return next(
            new ErrorResponse('Event with this date already exists.', 400)
        );

    event = await Event.create({ name, date, groupId });

    const members = await UserGroup.findAll({
        where: {
            groupId: { [Op.eq]: group.id },
            isConfirmed: { [Op.eq]: 1 }
        }
    });

    members.forEach(async m => {
        await Presence.create({
            userId: m.userId,
            eventId: event.id,
            confirmedBy: null
        });
    });

    res.status(200).json({
        success: true,
        data: { event }
    });
});