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
        ]
    };
    
    const { isArchive } = req.query; 
    if (isArchive) options.where.isArchive = { [Op.eq]: isArchive };

    const specializations = await Specialization.findAll(options);

    res.status(200).json({
        success: true,
        data: {
            specializations
        }
    });
});
