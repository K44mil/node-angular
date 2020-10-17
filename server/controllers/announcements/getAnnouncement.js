const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Announcement = require('../../models/Announcement');

/**
 * @desc    Get Announcement by ID
 * @route   GET /api/v1/announcements/:id
 * @access  Private/Admin
 */
exports.getAnnouncement = asyncHandler(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
        return next(
            new ErrorResponse(`Announcement with id '${req.params.id}' does not exist.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            announcement
        }
    });
});