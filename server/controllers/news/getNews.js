const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');
const User = require('../../models/User');
const { Op } = require('sequelize');

/**
 * @desc    Get all news
 * @route   GET /api/v1/news
 * @access  Private/Admin
 */
exports.getNews = asyncHandler(async (req, res, next) => {
    let options = {
        where: { },
        order: [],
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
        ]
    };

    const { title } = req.query;

    // SELECT
    if (title) options.where.title = { [Op.like]: `%${title}%` };

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    options.offset = startIndex;
    options.limit = limit;

    const news = await News.findAndCountAll(options);

    // Pagination results
    const pagination = { };

    if (endIndex < news.count) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
 
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    // Count pages
    const countPages = Math.ceil(news.count / limit);

    res.status(200).json({
        success: true,
        data: {
            count: news.count,
            countPages: countPages,
            pagination,
            news: news.rows
        }
    });
});