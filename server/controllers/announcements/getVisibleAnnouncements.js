const asyncHandler = require('../../middleware/asyncHandler');
const Announcement = require('../../models/Announcement');

/**
 * @desc    Get all visible Announcements
 * @route   GET /api/v1/announcements/visible
 * @access  Public
 */
exports.getVisibleAnnouncements = asyncHandler(async (req, res, next) => {
    const announcements = await Announcement.find({
        isVisible: true,
        visibleFrom: {
            $lte: new Date()
        }
    });

    let visibleAnnoucements = [];
        
    for (const announcement of announcements) {
        if (!announcement.visibleTo)
            visibleAnnoucements.push(announcement);
        else if (announcement.visibleTo && announcement.visibleTo > Date.now())
            visibleAnnoucements.push(announcement);
    }

    res.status(200).json({
        success: true,
        data: {
            announcements: visibleAnnoucements
        }
    });
});