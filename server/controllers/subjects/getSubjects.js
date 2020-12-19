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
        ]
    };
    
    const { isArchive } = req.query; 
    if (isArchive) options.where.isArchive = { [Op.eq]: isArchive };

    const subjects = await Subject.findAll(options);

    res.status(200).json({
        success: true,
        data: {
            subjects
        }
    });
});
