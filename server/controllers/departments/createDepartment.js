const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Department = require('../../models/Department');

/**
 * @desc    Create Department
 * @route   POST /api/v1/departments
 * @access  Private/Admin
 */
exports.createDepartment = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    const department = await Department.build({
        name,
        short,
        isVisible
    });
    await department.save();

    res.status(201).json({
        success: true,
        data: {
            department
        }
    })
});