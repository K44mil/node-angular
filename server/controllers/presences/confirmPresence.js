const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const Presence = require('../../models/Presence');
const Event = require('../../models/Event');

/**
 * @desc    Confirm presence on event
 * @route   GET /api/v1/presences/:id/confirm
 * @access  Private
 */
exports.confirmPresence = asyncHandler(async (req, res, next) => {
    const presence = await Presence.findByPk(req.params.id);
    const user = req.user;

    if (!presence) {
        return next(
            new ErrorResponse('Cannot confirm this presence.', 400)
        );
    }

    if (user.id != presence.userId) {
        return next(
            new ErrorResponse('Cannot confirm this presence.', 400)
        );
    }

    const event = await Event.findByPk(presence.eventId);
    if (!event) {
        return next(
            new ErrorResponse('Cannot confirm this presence.', 400)
        );
    }

    if (!event.isOpen) {
        return next(
            new ErrorResponse('Cannot confirm this presence.', 400)
        );
    }

    await presence.update({
        isConfirmed: true,
        confirmedBy: user.id
    });

    res.status(200).json({
        success: true,
        data: {
            presence
        }
    });
});