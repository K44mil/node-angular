const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');
const NewsAccess = require('../../models/NewsAccess');

/**
 * @desc    Change news protected
 * @route   GET /api/v1/news/:id/change_protected
 * @access  Private/Admin
 */
exports.changeProtected = asyncHandler(async (req, res, next) => {
    let news = await News.findByPk(req.params.id, { include: NewsAccess });

    if (!news) {
        return next(
            new ErrorResponse(`News does not exist.`, 400)
        );
    }

    if (news.isLoginProtected == true) {
        if (news.NewsAccess && news.NewsAccess.isOn === true)
            return next(new ErrorResponse('This news has restricted access. It cannot be visible by not logged users.', 400));
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