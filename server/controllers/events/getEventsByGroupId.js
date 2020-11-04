const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Event = require('../../models/Event');
const Group = require('../../models/Group');
const { Op } = require('sequelize');

/**
 * @desc    Get events by group id
 * @route   GET /api/v1/events/group/:id
 * @access  Private
 */
exports.getEventsByGroupId = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return next(
            new ErrorResponse('Group does not exist', 400)
        );
    }

    const events = await Event.findAll({
        where: {
            groupId: {
                [Op.eq]: group.id
            }
        },
        order: [
            ['date', 'ASC']
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            events
        }
    });
});