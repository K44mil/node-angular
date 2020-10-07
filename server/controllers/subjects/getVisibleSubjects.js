const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');
const { Op } = require('sequelize');

/**
 * @desc    Get Visible Subjects
 * @route   GET /api/v1/subjects/visible
 * @access  Public
 */
exports.getVisibleSubjects = asyncHandler(async (req, res, next) => {
    const subjects =  await Subject.findAll({
        where: {
            isVisible: {
                [Op.eq]: 1
            }
        }
    });

    res.status(200).json({
        success: true,
        data: {
            subjects
        }
    });
});