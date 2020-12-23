const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');
const User = require('../../models/User');
const Category = require('../../models/Category');
const NewsCategory = require('../../models/relationsModels/NewsCategory');
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
        attributes: ['id', 'title', 'created_at', 'isCommentable', 'isLoginProtected', 'isVisible'],
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Category,
                attributes: ['name']
            }
        ]
    };

    const { title, categoryId } = req.query;

    // SELECT

    // Where
    if (title) options.where.title = { [Op.like]: `%${title}%` };

    if (categoryId)
        options.include.push({ model: Category, attributes: ['id', 'name'], where: { id: {[Op.eq]: categoryId} } });
    else
        options.include.push({ model: Category, attributes: ['id', 'name'] });

    // Order
    if (req.query.sort) {
        const order = req.query.sort.split(',');
        if (!order.includes('ASC') && !order.includes('DESC')) order[1] = 'ASC';
        options.order.push(order);
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    options.offset = startIndex;
    options.limit = limit;

    options.distinct = true;
    const news = await News.findAndCountAll(options);

    // Find categories for each news
    const returnNews = [];
    for (const n of news.rows) {
        const newsJSON = n.toJSON();
        newsJSON.categories = await Category.findAll({
            include: [
                {
                    model: News,
                    attributes: ['id'],
                    where: { id: { [Op.eq]: n.id }}
                }
            ]
        });

        delete newsJSON.Categories;

        returnNews.push(newsJSON);
    }

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
            news: returnNews
        }
    });
});