const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const News = require('../../models/News');
const NewsCategory = require('../../models/relationsModels/NewsCategory');
const path = require('path');
const slugify = require('slugify');
const { Op } = require('sequelize');
const Category = require('../../models/Category');
const File = require('../../models/File');
const NewsFile = require('../../models/relationsModels/NewsFile');

/**
 * @desc    Create News
 * @route   POST /api/v1/news
 * @access  Private/Admin
 */
exports.createNews = asyncHandler(async (req, res, next) => {
    const { title, description, content, isVisible,
         isCommentable, isLoginProtected, categories, files } = req.body;
    const authorId = req.user.id;
    let categoriesIds;
    if (categories) categoriesIds = categories.split(',');

    let filesIds;
    if (files) filesIds = JSON.parse(files);

    if (!title) {
        return next(
            new ErrorResponse('Title is required.', 400)
        );
    }

    let news = await News.build({
        title,
        description,
        content,
        isVisible,
        isCommentable,
        isLoginProtected,
        authorId
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

    if (req.files && req.files.photo) {
        const file = req.files.photo;

        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload an image file`, 400));
        }

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
        });
        news.image = file.name;
    }
    news = await news.save();

    for (const categoryId of categoriesIds) {
        const category = await Category.findByPk(categoryId);
        if (category) {
            await NewsCategory.create({
                newsId: news.id,
                categoryId: category.id
            });
        }    
    }

    // Link Files
    if (filesIds) {
        for (const id of filesIds) {
            const file = await File.findByPk(id);
            if (file) {
                const newsFile = await NewsFile.findOne({
                    where: {
                        fileId: {
                            [Op.eq]: file.id
                        },
                        newsId: {
                            [Op.eq]: news.id
                        }
                    }
                });
                if (!newsFile) {
                    await NewsFile.create({
                        fileId: file.id,
                        newsId: news.id
                    });
                }
            }
        }
    }
    // if (req.files && req.files.files) {
    //     const allowedExtensions = new String(process.env.ALLOWED_FILE_EXTENSIONS).split(',');
    //     const files = req.files.files.length === undefined ? new Array(req.files.files) : req.files.files;


    //     for (const file of files) {
    //         fileExt = path.parse(file.name).ext;
    //         if (allowedExtensions.includes(fileExt)) {
    //             if (file.size < process.env.MAX_FILE_UPLOAD) {
    //                 // console.log(file);
    //                 // const type = path.extname(file.name).toString().replace('.', '');
    //                 const createdFile = await File.build({
    //                     name: file.name,
    //                     type: file.mimetype,
    //                     size: String(file.size),
    //                     newsId: news.id
    //                 });

    //                 // Is Login Protected
    //                 if (news.isLoginProtected)
    //                     createdFile.isLoginProtected = true;

    //                 createdFile.path = `${process.env.FILE_UPLOAD_PATH}/${createdFile.id}${fileExt}`;
    //                 file.mv(`./${createdFile.path}`, err => {
    //                     console.log(err);
    //                 });

    //                 await createdFile.save();
    //             }
    //         }
    //     }
    // }

    news = await News.findByPk(news.id, {
        // include: [Category, File]
    });

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});