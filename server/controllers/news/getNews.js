const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');
const User = require('../../models/User');

/**
 * @desc    Get all news
 * @route   GET /api/v1/news
 * @access  Private/Admin
 */
exports.getNews = asyncHandler(async (req, res, next) => {
    const news = await News.findAll({
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            }
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});