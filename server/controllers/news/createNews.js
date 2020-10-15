const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');
const path = require('path');
const slugify = require('slugify');
const { Op } = require('sequelize');

/**
 * @desc    Create News
 * @route   POST /api/v1/news
 * @access  Private/Admin
 */
exports.createNews = asyncHandler(async (req, res, next) => {
    const { title, description, content, isVisible,
         isCommentable, isLoginProtected } = req.body;

    if (!title) {
        return next(
            new ErrorResponse('Title is required.', 400)
        );
    }

    const news = await News.build({
        title,
        description,
        content,
        isVisible,
        isCommentable,
        isLoginProtected
    });
    // Slugify title
    news.slug = slugify(news.title, { lower: true });

    let existingNews = await News.findOne({
        where: {
            slug: {
                [Op.like]: news.slug
            }
        }
    });

    if (existingNews) {
        return next(
            new ErrorResponse(`News with this title already exists`, 400)
        );
    }

    if (req.files.photo) {
        const file = req.files.photo;

        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload an image file`, 400));
        }
        console.log(file.size);
        if (file.size > process.env.MAX_NEWS_PHOTO_UPLOAD) {
            return next(
              new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_NEWS_PHOTO_UPLOAD}`,
                400
              )
            );
        }

        file.name = `photo_${news.id}${path.parse(file.name).ext}`;

        file.mv(`${process.env.NEWS_PHOTO_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(new ErrorResponse(`File upload error`, 500));
            }
        })
        news.image = file.name;
    }

    await news.save();

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});