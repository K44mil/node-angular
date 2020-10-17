const asyncHandler = require('../../middleware/asyncHandler');
const Announcement = require('../../models/Announcement');

/**
 * @desc    Get all Announcements
 * @route   GET /api/v1/announcements
 * @access  Private/Admin
 */
exports.getAnnouncements = asyncHandler(async (req, res, next) => {
    const announcements = await Announcement.find();

    res.status(200).json({
        success: true,
        data: {
            announcements
        }
    });
});