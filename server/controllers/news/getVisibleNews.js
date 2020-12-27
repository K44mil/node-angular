const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');
const News = require('../../models/News');
const { Op } = require('sequelize');
const User = require('../../models/User');
const Category = require('../../models/Category');
const Comment = require('../../models/Comment');
const NewsAccess = require('../../models/NewsAccess');
const Course = require('../../models/Course');
const Group = require('../../models/Group');
const UserGroup = require('../../models/relationsModels/UserGroup');
const Role = require('../../models/Role');
const ErrorResponse = require('../../utils/ErrorResponse');

/**
 * @desc    Get all visible news
 * @route   POST /api/v1/news/visible
 * @access  Public
 */
exports.getVisibleNews = asyncHandler(async (req, res, next) => {
    let options = {
        where: { },
        order: [],
        include: [],
        attributes: ['id', 'title', 'slug', 'description', 'created_at', 'updated_at', 'isLoginProtected', 'imageSection', 'image']
    }

    const { title, categoryId } = req.query;
    
    // SELECT

    // Where
    if (title) options.where.title = { [Op.like]: `%${title}%` };
    options.where.isVisible = { [Op.eq]: 1 };

    // Order
    options.order.push(['created_at', 'DESC']);

    // INCLUDE
    options.include.push({ model: User, attributes: ['firstName', 'lastName'] });
    if (categoryId)
        options.include.push({ model: Category, attributes: ['id', 'name'], where: { id: {[Op.eq]: categoryId} } });
    else
        options.include.push({ model: Category, attributes: ['id', 'name'] });

    // Include Access
    options.include.push({
        model: NewsAccess,
        include: [
            { model: Course, attributes: ['id'] },
            { model: Group, attributes: ['id'] },
            { model: User, attributes: ['id'] }
        ]
    });
        
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // options.offset = startIndex;
    // options.limit = limit;

    options.distinct = true;
    const news = await News.findAndCountAll(options);

    // Access and comments
    const user = await getLoggedUser(req);
    if (user && (user.isBlocked || !user.isVerified)) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }
    let userGroups;
    let userCoursesIds;
    let userGroupsIds;

    if (user) userGroups = await UserGroup.findAll({
        where: { userId: { [Op.eq]: user.id }, isConfirmed: { [Op.eq]: 1 } },
        include: { model: Group, include: [Course]}
    });
    if (userGroups) {
        userCoursesIds = [];
        userGroupsIds = [];
        for (const uG of userGroups) {
            if (uG.Group) userGroupsIds.push(uG.Group.id);
            if (uG.Group && uG.Group.Course) userCoursesIds.push(uG.Group.Course.id);
        }
    }

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

        newsJSON.categories = await Category.findAll({
            include: [
                {
                    model: News,
                    attributes: ['id'],
                    where: { id: { [Op.eq]: n.id }}
                }
            ]
        })
        delete newsJSON.Categories;
        
        let isAuthorized = false;

        if(!newsJSON.NewsAccess.isOn)
            isAuthorized = true;
        else {
            isAuthorized = false;
            if (user) {
                if (user.role === Role.Admin)
                    isAuthorized = true;
                else {
                    for (const course of newsJSON.NewsAccess.Courses) {
                        if (userCoursesIds.includes(course.id)) isAuthorized = true;
                    }
                    
                    for (const group of newsJSON.NewsAccess.Groups) {
                        if (userGroupsIds.includes(group.id)) isAuthorized = true;
                    }
                        
                    for (const u of newsJSON.NewsAccess.Users)
                        if (u.id === user.id) isAuthorized = true;
                }
            } 
        }

        delete newsJSON.NewsAccess;

        if (isAuthorized) returnNews.push(newsJSON);
    }

    const resultNews = [];
    for (let i = 0; i < returnNews.length; i++) {
        if (i >= startIndex && i < endIndex)
            resultNews.push(returnNews[i]);
    }

    // Pagination results
    const pagination = {};

    if (endIndex < returnNews.length) {
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
    const countPages = Math.ceil(returnNews.length / limit);

    res.status(200).json({
        success: true,
        data: {
            count: returnNews.length,
            countPages: countPages,
            pagination,
            news: resultNews
        }
    });
});