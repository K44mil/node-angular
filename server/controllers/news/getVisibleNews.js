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
    
    // test where

    // Order
    options.order.push(['created_at', 'DESC']);

    // INCLUDE
    options.include.push({ model: User, attributes: ['firstName', 'lastName'] });
    options.include.push({ model: Category, attributes: ['name'] });
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

    options.offset = startIndex;
    options.limit = limit;

    options.distinct = true;
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

    // Access and comments
    const user = await getLoggedUser(req);
    let userGroups;
    let userCoursesIds;
    let userGroupsIds;

    if (user) userGroups = await UserGroup.findAll({ where: { userId: { [Op.eq]: user.id }}, include: { model: Group, include: [Course]}});
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

        if(!newsJSON.NewsAccess.isOn)
            newsJSON.canOpen = true;
        else {
            newsJSON.canOpen = false;
            if (user) {
                if (user.role === Role.Admin)
                    newsJSON.canOpen = true;
                else {
                    for (const course of newsJSON.NewsAccess.Courses) {
                        if (userCoursesIds.includes(course.id)) newsJSON.canOpen = true;
                    }
                    
                    for (const group of newsJSON.NewsAccess.Groups) {
                        if (userGroupsIds.includes(group.id)) newsJSON.canOpen = true;
                    }
                        
                    for (const u of newsJSON.NewsAccess.Users)
                        if (u.id === user.id) newsJSON.canOpen = true;
                }
            } 
        }

        delete newsJSON.NewsAccess;

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