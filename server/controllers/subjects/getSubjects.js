const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const Specialization = require('../../models/Specialization');
const Subject = require('../../models/Subject');
const { Op } = require('sequelize');

/**
 * @desc    Get Subjects
 * @route   GET /api/v1/subjects
 * @access  Private/Admin
 */
exports.getSubjects = asyncHandler(async (req, res, next) => {
    let options = {
        where: {},
        include: [
            {
                model: Specialization,
                attributes: ['name'],
                include: [
                    {
                        model: Course,
                        attributes: ['name']
                    }
                ]
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
        options.order.push([Specialization, 'name', 'ASC']);
    }

    const subjects = await Subject.findAll(options);

    res.status(200).json({
        success: true,
        data: {
            subjects
        }
    });
});
