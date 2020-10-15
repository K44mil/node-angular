const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');

const News = require('../../models/News');
const { Op } = require('sequelize');

/**
 * @desc    Get News by slug
 * @route   POST /api/v1/news/:slug
 * @access  [Public/Private]
 */
exports.getNewsBySlug = asyncHandler(async (req, res, next) => {
    const slug = req.params.slug;

    const news = await News.findOne({
        where: {
            slug: {
                [Op.like]: slug
            }
        }
    });

    if (!news) {
        return next(
            new ErrorResponse(`News with slug ${slug} does not exist.`, 400)
        );
    }

    const user = await getLoggedUser(req);
    
    if (news.isLoginProtected && !user) {
        return next(
            new ErrorResponse(`Not authorized.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});