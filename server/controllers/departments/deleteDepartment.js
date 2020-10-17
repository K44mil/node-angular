const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Department = require('../../models/Department');

/**
 * @desc    Delete Department
 * @route   DELETE /api/v1/departments/:id
 * @access  Private/Admin
 */
exports.deleteDepartment = asyncHandler(async (req, res, next) => {
    let department = await Department.findByPk(req.params.id);

    if (!department) {
        return next(
            new ErrorResponse(`Cannot find Department with ID '${req.params.id}'.`, 400)
        );
    }
    await department.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});