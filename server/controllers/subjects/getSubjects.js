const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const Specialization = require('../../models/Specialization');
const Subject = require('../../models/Subject');

/**
 * @desc    Get Subjects
 * @route   GET /api/v1/subjects
 * @access  Private/Admin
 */
exports.getSubjects = asyncHandler(async (req, res, next) => {
    const subjects = await Subject.findAll({
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
    });

    res.status(200).json({
        success: true,
        data: {
            subjects
        }
    });
});
