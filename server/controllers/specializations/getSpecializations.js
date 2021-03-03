const { model } = require('mongoose');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const Specialization = require('../../models/Specialization');
const { Op } = require('sequelize');

/**
 * @desc    Get Specializations
 * @route   GET /api/v1/specializations
 * @access  Private/Admin
 */
exports.getSpecializations = asyncHandler(async (req, res, next) => {
    let options = {
        where: {},
        include: [
            {
                model: Course,
                attributes: ['name']
            }
        ],
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
        options.order.push([Course, 'name', 'ASC']);
    }

    const specializations = await Specialization.findAll(options);

    res.status(200).json({
        success: true,
        data: {
            specializations
        }
    });
});
