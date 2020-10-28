const asyncHandler = require('../../middleware/asyncHandler');
const Department = require('../../models/Department');
const { Op } = require('sequelize');

/**
 * @desc    Get Visible Departments
 * @route   GET /api/v1/departments/visible
 * @access  Public
 */
exports.getVisibleDepartments = asyncHandler(async (req, res, next) => {
    const departments =  await Department.findAll({
        where: {
            isVisible: {
                [Op.eq]: 1
            }
        }
    });

    res.status(200).json({
        success: true,
        data: {
            departments
        }
    });
});