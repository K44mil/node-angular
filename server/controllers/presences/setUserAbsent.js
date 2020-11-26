const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Presence = require('../../models/Presence');
const Event = require('../../models/Event');

/**
 * @desc    Set User Presence Unconfirmed
 * @route   GET /api/v1/presences/:id/absent
 * @access  Private/Admin
 */
exports.setUserAbsent = asyncHandler(async (req, res, next) => {
    const presence = await Presence.findByPk(req.params.id);

    if (!presence) {
        return next(
            new ErrorResponse('Cannot change this presence.', 400)
        );
    }

    const event = await Event.findByPk(presence.eventId);
    if (!event) {
        return next(
            new ErrorResponse('Cannot change this presence.', 400)
        );
    }

    await presence.update({
        isConfirmed: false,
        updatedBy: `${req.user.firstName} ${req.user.lastName}`
    });

    res.status(200).json({
        success: true,
        data: {
            presence
        }
    });
});