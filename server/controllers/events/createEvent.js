const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Event = require('../../models/Event');
const Group = require('../../models/Group');

/**
 * @desc    Create Event
 * @route   POST /api/v1/events
 * @access  Private/Admin
 */
exports.createEvent = asyncHandler(async (req, res, next) => {
    const { name, date, groupId } = req.body;
    
    if (!name || !date) {
        return next(
            new ErrorResponse('Event name and date are required.', 400)
        );
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist', 400)
        );
    }

    const event = await Event.create({
        name,
        date,
        groupId
    });

    // TODO: Create presence for event

    res.status(200).json({
        success: true,
        data: {
            event
        }
    });
});