const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Event = require('../../models/Event');
const { Op } = require('sequelize');

/**
 * @desc    Update Event
 * @route   PUT /api/v1/events/:id
 * @access  Private/Admin
 */
exports.updateEvent = asyncHandler(async (req, res, next) => {
    const { name, date } = req.body;
    let event = await Event.findByPk(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse('Event does not exist.', 400)
        );
    } 

    const sameEvent = await Event.findOne({
        where: {
            groupId: {
                [Op.eq]: event.groupId 
            },
            date: {
                [Op.eq]: date
            }
        } 
    });

    if (sameEvent && sameEvent.id != event.id) {
        return next(
            new ErrorResponse('Event with this date already exists.', 400)
        );
    }

    event = await event.update({
        name: name,
        date: date
    });

    res.status(200).json({
        success: true,
        data: {
            event
        }
    })
});