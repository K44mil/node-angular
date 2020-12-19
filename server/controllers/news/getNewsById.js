const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const News = require('../../models/News');
const User = require('../../models/User');
const NewsAccess = require('../../models/NewsAccess');
const Course = require('../../models/Course');
const Group = require('../../models/Group');
const File = require('../../models/File');
const Category = require('../../models/Category');

/**
 * @desc    Get news by id
 * @route   GET /api/v1/news/:id
 * @access  Private/Admin
 */
exports.getNewsById = asyncHandler(async (req, res, next) => {
    const news = await News.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: File
            },
            {
                model: Category
            },
            {
                model: NewsAccess,
                include: [
                    { model: Course },
                    { model: Group },
                    { model: User }
                ]
            }
        ]
    });

    if (!news) {
        return next(
            new ErrorResponse('News does not exist.', 400)
        )
    }

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});