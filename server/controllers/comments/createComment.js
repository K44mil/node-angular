const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Comment = require('../../models/Comment');
const News = require('../../models/News');

/**
 * @desc    Add Comment to the News
 * @route   POST /api/v1/comments/news/:id
 * @access  Private
 */
exports.createComment = asyncHandler(async (req, res, next) => {
    const news = await News.findByPk(req.params.id);

    if (!req.body.content) {
        return next(
            new ErrorResponse(`Comment content is required.`, 400)
        );
    }

    if (!news) {
        return next(
            new ErrorResponse(`News with ID '${req.params.id}' does not exist.`, 400)
        );
    }

    if (!news.isCommentable) {
        return next(
            new ErrorResponse(`Comments are not available for this news.`, 400)
        );
    }

    const comment = await Comment.create({
        content: req.body.content,
        userId: req.user.id,
        newsId: news.id
    });

    res.status(200).json({
        success: true,
        data: {
            comment
        }
    })
});