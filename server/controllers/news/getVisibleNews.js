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
    const news = await News.findAll({
        // attributes: {
        //     include: [[Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'commentsCount']],
        // },
        // group: ['News.id'],
        include: [
            // {
            //     model: Comment,
            //     attributes: []
            // },
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Category,
                attributes: ['name']
            },
        ],
        where: {
            isVisible: {
                [Op.eq]: 1
            }
        },
        order: [
            ['created_at', 'DESC']
        ]
    });

    const returnNews = [];
    for (const n of news) {
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
            news: returnNews
        }
    });
});