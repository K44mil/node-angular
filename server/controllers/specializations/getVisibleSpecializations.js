const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');
const { Op } = require('sequelize');

/**
 * @desc    Get Visible Specializations
 * @route   GET /api/v1/specializations/visible
 * @access  Public
 */
exports.getVisibleSpecializations = asyncHandler(async (req, res, next) => {
    const specializations =  await Specialization.findAll({
        where: {
            isVisible: {
                [Op.eq]: 1
            }
        }
    });

    res.status(200).json({
        success: true,
        data: {
            specializations
        }
    });
});