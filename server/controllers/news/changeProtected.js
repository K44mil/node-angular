const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');

/**
 * @desc    Change news protected
 * @route   GET /api/v1/news/:id/change_protected
 * @access  Private/Admin
 */
exports.changeProtected = asyncHandler(async (req, res, next) => {
    let news = await News.findByPk(req.params.id);

    if (!news) {
        return next(
            new ErrorResponse(`News does not exist.`, 400)
        );
    }

    if (news.isLoginProtected == true) {
        news = await news.update({
            isLoginProtected: false
        });
    } else {
        news = await news.update({
            isLoginProtected: true
        });
    }

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});