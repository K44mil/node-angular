const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');

const News = require('../../models/News');
const { Op } = require('sequelize');
const User = require('../../models/User');
const Category = require('../../models/Category');

/**
 * @desc    Get all news
 * @route   POST /api/v1/news
 * @access  [Public/Private]
 */
exports.getNews = asyncHandler(async (req, res, next) => {
    const news = await News.findAll({
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Category,
                attributes: ['name']
            }
        ],
    });

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});