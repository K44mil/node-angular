const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Announcement = require('../../models/Announcement');

/**
 * @desc    Create Announcement
 * @route   POST /api/v1/announcements
 * @access  Private/Admin
 */
exports.createAnnouncement = asyncHandler(async (req, res, next) => {
    const { title, content, visibleFrom, visibleTo, isVisible } = req.body;

    if (!title || !content) {
        return next(
            new ErrorResponse('Announcement title and content are required.', 400)
        );
    }

    const announcement = await Announcement.create({
        title,
        content,
        visibleFrom,
        visibleTo,
        isVisible
    });

    res.status(200).json({
        success: true,
        data: {
            announcement
        }
    });
});