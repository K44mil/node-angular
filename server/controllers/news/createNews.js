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

const NewsAccess = require('../../models/NewsAccess');
const NewsAccessCourse = require('../../models/relationsModels/NewsAccessCourse');
const NewsAccessGroup = require('../../models/relationsModels/NewsAccessGroup');
const NewsAccessUser = require('../../models/relationsModels/NewsAccessUser');

/**
 * @desc    Create News
 * @route   POST /api/v1/news
 * @access  Private/Admin
 */
exports.createNews = asyncHandler(async (req, res, next) => {
    const { title, description, content, isVisible,
         isCommentable, isLoginProtected, categories, files, photoSection, filesSection } = req.body;
    const authorId = req.user.id;
    let categoriesIds = [];
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
        authorId,
        imageSection: photoSection,
        filesSection
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

    // Set up news access
    let { access } = req.body;
    if (access) {
        try {
            access = JSON.parse(access);

            let { courses, groups, users } = access;

            // Create News Access
            const newsAccess = await NewsAccess.create({
                newsId: news.id,
                isOn: access.isOn
            });

            let coursesIds = courses || [];
            let groupsIds = groups || [];
            let usersIds = users || [];

            // Courses allowed
            for (const id of coursesIds) {
                await NewsAccessCourse.create({
                    newsAccessId: newsAccess.id,
                    courseId: id
                });
            }

            // Groups allowed
            for (const id of groupsIds) {
                await NewsAccessGroup.create({
                    newsAccessId: newsAccess.id,
                    groupId: id
                });
            }

            // Users allowed
            for (const id of usersIds) {
                await NewsAccessUser.create({
                    newsAccessId: newsAccess.id,
                    userId: id
                });
            }

        } catch (err) {
            await news.destroy();
            return next(
                new ErrorResponse('Something gone wrong with news access', 400)
            )
        }
    }

    news = await News.findByPk(news.id);

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});