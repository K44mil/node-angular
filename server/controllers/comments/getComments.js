const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Comment = require('../../models/Comment');
const News = require('../../models/News');
const User = require('../../models/User');
const { Op } = require('sequelize');

/**
 * @desc    Get all news comments
 * @route   GET /api/v1/comments/news/:id
 * @access  Private
 */
exports.getComments = asyncHandler(async (req, res, next) => {
    const news = await News.findByPk(req.params.id);

    if (!news) {
        return next(
            new ErrorResponse(`News with ID '${req.params.id}' does not exist.`, 400)
        );
    }

    const comments = await Comment.findAll({
        where: {
            newsId: {
                [Op.eq]: req.params.id
            }
        },
        include: {
            model: User,
            attributes: ['firstName', 'lastName']
        }
    });

    res.status(200).json({
        success: true,
        data: {
            comments
        }
    });
});