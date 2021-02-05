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

    if (!title || title === '')
        return next(new ErrorResponse('Title is required.', 400));

    if (!content || content === '')
        return next(new ErrorResponse('Title is required.', 400));

    if (!visibleTo || visibleTo === '')
        return next(new ErrorResponse('Visible To is required.', 400));
    
    if (title.length > 100)
        return next(new ErrorResponse('Title cannot be longer than 100 characters.', 400));

    if (content.length > 500)
        return next(new ErrorResponse('Content cannot be longer than 100 characters.', 400));

    if (new Date(visibleFrom) > new Date(visibleTo))
        return next(new ErrorResponse('Visible From Date cannot be greater than Visible To Date.', 400));

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