const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Presence = require('../../models/Presence');
const Event = require('../../models/Event');
const User = require('../../models/User');

/**
 * @desc    Get Presence Details
 * @route   GET /api/v1/presences/:id
 * @access  Private/Admin
 */
exports.getPresence = asyncHandler(async (req, res, next) => {
    const presence = await Presence.findByPk(req.params.id, {
        include: [
            {
                model: Event,
                attributes: ['name']
            },
            {
                model: User,
                as: 'user',
                attributes: ['firstName', 'lastName']
            },
            {
                model: User,
                as: 'confirmed',
                attributes: ['firstName', 'lastName']
            }
        ]
    });

    if (!presence) {
        return next(
            new ErrorResponse('Presence does not exist.', 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            presence
        }
    });
});