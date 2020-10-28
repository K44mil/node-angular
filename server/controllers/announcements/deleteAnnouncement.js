const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Announcement = require('../../models/Announcement');

/**
 * @desc    Delete Announcement
 * @route   DELETE /api/v1/announcements/:id
 * @access  Private/Admin
 */
exports.deleteAnnouncement = asyncHandler(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
        return next(
            new ErrorResponse(`Announcement with id '${req.params.id}' does not exist.`, 400)
        );
    }

    const id = announcement._id;
    await announcement.remove();

    res.status(200).json({
        success: true,
        data: {
            id
        }
    });
});