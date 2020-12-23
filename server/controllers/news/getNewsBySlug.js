const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');
const News = require('../../models/News');
const { Op } = require('sequelize');
const Category = require('../../models/Category');
const User = require('../../models/User');
const File = require('../../models/File');
const NewsAccess = require('../../models/NewsAccess');
const Course = require('../../models/Course');
const Group = require('../../models/Group');
const UserGroup = require('../../models/relationsModels/UserGroup');
const Role = require('../../models/Role');

/**
 * @desc    Get News by slug
 * @route   POST /api/v1/news/:slug
 * @access  [Public/Private]
 */
exports.getNewsBySlug = asyncHandler(async (req, res, next) => {
    const slug = req.params.slug;

    const news = await News.findOne({
        where: {
            slug: {
                [Op.like]: slug
            }
        },
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Category,
                attributes: ['name']
            },
            {
                model: File,
                attributes: ['name', 'id', 'type']
            },
            {
                model: NewsAccess,
                include: [
                    { model: Course, attributes: ['id'] },
                    { model: Group, attributes: ['id'] },
                    { model: User, attributes: ['id'] }
                ]
            }
        ]
    });

    if (!news) {
        return next(
            new ErrorResponse(`News with slug ${slug} does not exist.`, 400)
        );
    }

    // Access
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

    if (!news.isVisible && (!user || (user && user.role !== Role.Admin))) {
        return next(
            new ErrorResponse('Not authorized', 400)
        );
    }
    
    if (news.isLoginProtected && !user) {
        return next(
            new ErrorResponse(`Not authorized.`, 400)
        );
    }

    let canOpen = false;

    if(!news.NewsAccess.isOn)
        canOpen = true;
    else {
        canOpen = false;
        if (user) {
            if (user.role === Role.Admin)
                canOpen = true;
            else {
                for (const course of news.NewsAccess.Courses) {
                    if (userCoursesIds.includes(course.id)) canOpen = true;
                }
                
                for (const group of news.NewsAccess.Groups) {
                    if (userGroupsIds.includes(group.id)) canOpen = true;
                }
                    
                for (const u of news.NewsAccess.Users)
                    if (u.id === user.id) canOpen = true;
            }
        } 
    }

    if (!canOpen) {
        return next(
            new ErrorResponse(`Not authorized.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            news
        }
    });
});