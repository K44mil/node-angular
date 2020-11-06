const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Event = require('../../models/Event');
const Presence = require('../../models/Presence');
const { Op } = require('sequelize');

/**
 * @desc    Delete Event
 * @route   DELETE /api/v1/events/:id
 * @access  Private/Admin
 */
exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse('Event does not exist', 400)
        );
    }

    // Destroy all Presences associated with Event
    await Presence.destroy({
        where: {
            eventId: {
                [Op.eq]: event.id
            }
        }
    })

    // Destroy Event and return id
    const id = event.id;
    await event.destroy();

    res.status(200).json({
        success: true,
        data: {
            id
        }
    });
});