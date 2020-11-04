const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Announcement = require('../../models/Announcement');

/**
 * @desc    Change announcement visibility
 * @route   POST /api/v1/announcements/:id/change_visibility
 * @access  Private/Admin
 */
exports.changeVisibility = asyncHandler(async (req, res, next) => {
    let announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
        return next(
            new ErrorResponse(`Announcement does not exist.`, 400)
        );
    }

    if (announcement.isVisible == true) {
        announcement.isVisible = false;
        await announcement.save();
    } else {
        announcement.isVisible = true;
        await announcement.save();
    }

    res.status(200).json({
        success: true,
        data: {
            // announcement
        }
    });
});