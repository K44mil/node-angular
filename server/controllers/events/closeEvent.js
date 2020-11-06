const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Event = require('../../models/Event');

/**
 * @desc    Close Event
 * @route   GET /api/v1/events/:id/close
 * @access  Private/Admin
 */
exports.closeEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findByPk(req.params.id)

    if (!event) {
        return next(
            new ErrorResponse('Event does not exist', 400)
        );
    }

    if (!event.isOpen) {
        return next(
            new ErrorResponse('Event is already closed.', 400)
        );
    }

    event = await event.update({
        isOpen: false
    });

    res.status(200).json({
        success: true,
        data: {
            event
        }
    });
});