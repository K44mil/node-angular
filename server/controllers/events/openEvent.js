const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Event = require('../../models/Event');

/**
 * @desc    Open Event
 * @route   GET /api/v1/events/:id/open
 * @access  Private/Admin
 */
exports.openEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findByPk(req.params.id)

    if (!event) {
        return next(
            new ErrorResponse('Event does not exist', 400)
        );
    }

    if (event.isOpen) {
        return next(
            new ErrorResponse('Event is already open.', 400)
        );
    }

    event = await event.update({
        isOpen: true
    });

    res.status(200).json({
        success: true,
        data: {
            event
        }
    });
});