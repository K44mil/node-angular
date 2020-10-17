const asyncHandler = require('../../middleware/asyncHandler');
const Department = require('../../models/Department');

/**
 * @desc    Get Departments
 * @route   GET /api/v1/departments
 * @access  Private/Admin
 */
exports.getDepartments = asyncHandler(async (req, res, next) => {
    const departments =  await Department.findAll();

    res.status(200).json({
        success: true,
        data: {
            departments
        }
    });
});