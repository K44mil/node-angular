const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');
const NewsCategory = require('../../models/relationsModels/NewsCategory');
const path = require('path');
const slugify = require('slugify');
const { Op } = require('sequelize');
const Category = require('../../models/Category');
const File = require('../../models/File');
const fs = require('fs');

/**
 * @desc    Delete news
 * @route   DELETE /api/v1/news/:id
 * @access  Private/Admin
 */
exports.deleteNews = asyncHandler(async (req, res, next) => {
    const news = await News.findByPk(req.params.id);
    if (!news) {
        return next(
            new ErrorResponse('News does not exist.', 400)
        )
    }

    await news.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});