const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Department = require('../../models/Department');

/**
 * @desc    Get Department by ID
 * @route   GET /api/v1/departments/:id
 * @access  Private/Admin
 */
exports.getDepartment = asyncHandler(async (req, res, next) => {
    const department = await Department.findByPk(req.params.id);

    if (!department) {
        return next(
            new ErrorResponse(`Cannot find Department with ID '${req.params.id}'.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            department
        }
    });
});