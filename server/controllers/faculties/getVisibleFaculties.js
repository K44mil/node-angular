const asyncHandler = require('../../middleware/asyncHandler');
const Faculty = require('../../models/Faculty');
const { Op } = require('sequelize');

/**
 * @desc    Get Visible Faculties
 * @route   GET /api/v1/faculties/visible
 * @access  Public
 */
exports.getVisibleFaculties = asyncHandler(async (req, res, next) => {
    const faculties =  await Faculty.findAll({
        where: {
            isVisible: {
                [Op.eq]: 1
            }
        }
    });

    res.status(200).json({
        success: true,
        data: {
            faculties
        }
    });
});