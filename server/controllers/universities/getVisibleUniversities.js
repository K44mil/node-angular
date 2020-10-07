const asyncHandler = require('../../middleware/asyncHandler');
const University = require('../../models/University');
const { Op } = require('sequelize');

/**
 * @desc    Get Visible Universities
 * @route   GET /api/v1/universities/visible
 * @access  Public
 */
exports.getVisibleUniversities = asyncHandler(async (req, res, next) => {
    const universities =  await University.findAll({
        where: {
            isVisible: {
                [Op.eq]: 1
            }
        }
    });

    res.status(200).json({
        success: true,
        data: {
            universities
        }
    });
});