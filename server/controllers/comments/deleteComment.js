const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Comment = require('../../models/Comment');
const Role = require('../../models/Role');
const User = require('../../models/User');
const { Op } = require('sequelize');

/**
 * @desc    Delete comment
 * @route   GET /api/v1/comments/:id
 * @access  Private
 */
exports.deleteComment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
        return next(
            new ErrorResponse('Comment does not exist.', 400)
        )
    }
    const user = req.user;

    if (comment.userId !== user.id && user.role !== Role.Admin) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        )
    }

    await comment.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});