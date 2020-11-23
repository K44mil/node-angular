const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const { Op } = require('sequelize');
const Course = require('../../models/Course');
const Specialization = require('../../models/Specialization');
const Subject = require('../../models/Subject');

/**
 * @desc    Get Active Groups
 * @route   POST /api/v1/groups/active
 * @access  Private/Admin
 */
exports.getGroups = asyncHandler(async (req, res, next) => {
    let options = {
        where: { },
        include: [],
        order: [],
    };

    const {
        number,
        displayName,
        isOpen,
        isArchive,
        level,
        type,
        academicYear,
        groupType,
        courseId,
        specializationId,
        subjectId
    } = req.query;

    // SELECT

    // Where
    if (number) options.where.number = { [Op.eq]: number };
    if (displayName) options.where.displayName = { [Op.like]: `%${displayName}%`};
    if (isOpen) options.where.isOpen = { [Op.eq]: isOpen === 'true' ? 1 : isOpen === 'false' ? 0 : isOpen };
    if (isArchive) options.where.isArchive = { [Op.eq]: isArchive === 'true' ? 1 : isArchive === 'false' ? 0 : isArchive };
    if (level) options.where.level = { [Op.like]: `${level}`};
    if (type) options.where.type = { [Op.like]: `${type}`};
    if (academicYear) options.where.academicYear = { [Op.like]: `%${academicYear}%`};
    if (groupType) options.where.groupType = { [Op.like]: `${groupType}`};
    if (courseId) options.where.courseId = { [Op.like]: `${courseId}`};
    if (specializationId) options.where.specializationId = { [Op.like]: `${specializationId}`};
    if (subjectId) options.where.subjectId = { [Op.like]: `${subjectId}`};

    // Include
    options.include.push({ model: Course, attributes: ['name'] });
    options.include.push({ model: Specialization, attributes: ['name'] });
    options.include.push({ model: Subject, attributes: ['name'] });

    // Sorting
    if (req.query.sort) {
        const order = req.query.sort.split(',');
        let sort;
        if (order.length > 0)
            switch (order[0]) {
                case 'course':
                    sort = req.query.sort.split(',');
                    sort = sort.reverse(); sort.pop(); sort.push('name'); sort.push(Course); sort = sort.reverse();
                    if (!sort.includes('ASC') && !sort.includes('DESC')) sort.pus('ASC');
                    options.order.push(sort);
                    break;
                case 'specialization':
                    sort = req.query.sort.split(',');
                    sort = sort.reverse(); sort.pop(); sort.push('name'); sort.push(Specialization); sort = sort.reverse();
                    if (!sort.includes('ASC') && !sort.includes('DESC')) sort.pus('ASC');
                    options.order.push(sort);
                    break;
                case 'subject':
                    sort = req.query.sort.split(',');
                    sort = sort.reverse(); sort.pop(); sort.push('name'); sort.push(Subject); sort = sort.reverse();
                    if (!sort.includes('ASC') && !sort.includes('DESC')) sort.pus('ASC');
                    options.order.push(sort);
                    break;
                default:
                    sort = req.query.sort.split(',');
                    if (!sort.includes('ASC') && !sort.includes('DESC')) sort[1] = 'ASC';
                    options.order.push(sort);
                    break;
            }
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    options.offset = startIndex;
    options.limit = limit;

    const groups = await Group.findAndCountAll(options);

    // Pagination results
    const pagination = {};

    if (endIndex < groups.count) {
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
    const countPages = Math.ceil(groups.count / limit);

    res.status(200).json({
        success: true,
        data: {
            count: groups.count,
            countPages: countPages,
            pagination,
            groups: groups.rows
        }
    });
});