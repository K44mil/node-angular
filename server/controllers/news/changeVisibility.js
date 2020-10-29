const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');

/**
 * @desc    Change news visibility
 * @route   GET /api/v1/news/:id/change_visibility
 * @access  Private/Admin
 */
exports.changeVisibility = asyncHandler(async (req, res, next) => {
    let news = await News.findByPk(req.params.id);

    if (!news) {
        return next(
            new ErrorResponse(`News does not exist.`, 400)
        );
    }

    if (news.isVisible == true) {
        news = await news.update({
            isVisible: false
        });
    } else {
        news = await news.update({
            isVisible: true
        });
    }

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});