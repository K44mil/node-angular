const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');
const sequelize = require('sequelize');
const News = require('../../models/News');
const { Op, Sequelize } = require('sequelize');
const User = require('../../models/User');
const Category = require('../../models/Category');
const Comment = require('../../models/Comment');

/**
 * @desc    Get all visible news
 * @route   POST /api/v1/news/visible
 * @access  Public
 */
exports.getVisibleNews = asyncHandler(async (req, res, next) => {
    let options = {
        where: { },
        order: [],
        include: []
    }

    const { title } = req.query;
    
    // SELECT

    // Where
    if (title) options.where.title = { [Op.like]: `%${title}%` };
    options.where.isVisible = { [Op.eq]: 1 };
    
    // Order
    options.order.push(['created_at', 'DESC']);

    // INCLUDE
    options.include.push({ model: User, attributes: ['firstName', 'lastName'] });
    options.include.push({ model: Category, attributes: ['name'] })
        
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // const total = await User.count();

    options.offset = startIndex;
    options.limit = limit;

    const news = await News.findAndCountAll(options);

    // Pagination results
    const pagination = {};

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

    const returnNews = [];
    for (const n of news.rows) {
        const newsJSON = n.toJSON();
        newsJSON.commentsCount = await Comment.count({
            where: {
                newsId: {
                    [Op.eq]: n.id
                }
            }
        });
        returnNews.push(newsJSON)
    }

    res.status(200).json({
        success: true,
        data: {
            count: news.count,
            countPages: countPages,
            pagination,
            news: returnNews
        }
    });
});