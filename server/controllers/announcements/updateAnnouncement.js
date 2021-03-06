const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Announcement = require('../../models/Announcement');

/**
 * @desc    Update Announcement
 * @route   PUT /api/v1/announcements/:id
 * @access  Private/Admin
 */
exports.updateAnnouncement = asyncHandler(async (req, res, next) => {
    let announcement = await Announcement.findById(req.params.id);
    const { visibleFrom, visibleTo } = req.body;
    if (!announcement) {
        return next(
            new ErrorResponse(`Announcement with id '${req.params.id}' does not exist.`, 400)
        );
    }

    if (new Date(visibleFrom) > new Date(visibleTo))
        return next(
            new ErrorResponse('Visible From Date cannot be greater than Visible To Date.', 400)
        );

    announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: {
            announcement
        }
    });
});