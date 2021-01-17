const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const { Op } = require('sequelize');

/**
 * @desc    Get Courses
 * @route   GET /api/v1/courses
 * @access  Private/Admin
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
    let options = {
        where: {},
        order: []
    };
    
    const { isArchive, name, short } = req.query; 
    if (isArchive) options.where.isArchive = { [Op.eq]: isArchive };
    if (name) options.where.name = { [Op.like]: `%${name}%` };
    if (short) options.where.short = { [Op.like]: `%${short}%` };

    // Order
    if (req.query.sort) {
        const order = req.query.sort.split(',');
        if (!order.includes('ASC') && !order.includes('DESC')) order[1] = 'ASC';
        options.order.push(order);
    } else {
        options.order.push(['name', 'ASC']);
    }

    const courses = await Course.findAll(options);

    res.status(200).json({
        success: true,
        data: {
            courses
        }
    });
});