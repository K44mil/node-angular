const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');

/**
 * @desc    Change news commentable
 * @route   GET /api/v1/news/:id/change_commentable
 * @access  Private/Admin
 */
exports.changeCommentable = asyncHandler(async (req, res, next) => {
    let news = await News.findByPk(req.params.id);

    if (!news) {
        return next(
            new ErrorResponse(`News does not exist.`, 400)
        );
    }

    if (news.isCommentable == true) {
        news = await news.update({
            isCommentable: false
        });
    } else {
        news = await news.update({
            isCommentable: true
        });
    }

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});