const { model } = require('mongoose');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const Specialization = require('../../models/Specialization');

/**
 * @desc    Get Specializations
 * @route   GET /api/v1/specializations
 * @access  Private/Admin
 */
exports.getSpecializations = asyncHandler(async (req, res, next) => {
    const specializations = await Specialization.findAll({
        include: [
            {
                model: Course,
                attributes: ['name']
            }
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            specializations
        }
    });
});
