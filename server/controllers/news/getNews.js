const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');
const sequelize = require('sequelize');
const News = require('../../models/News');
const { Op, Sequelize } = require('sequelize');
const User = require('../../models/User');
const Category = require('../../models/Category');
const Comment = require('../../models/Comment');

/**
 * @desc    Get all news
 * @route   POST /api/v1/news
 * @access  Private/Admin
 */
exports.getNews = asyncHandler(async (req, res, next) => {
    const news = await News.findAll({});

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});