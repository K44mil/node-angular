const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Department = require('../../models/Department');

/**
 * @desc    Update Department
 * @route   PUT /api/v1/departments/:id
 * @access  Private/Admin
 */
exports.updateDepartment = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;
    let department = await Department.findByPk(req.params.id);

    if (!department) {
        return next(
            new ErrorResponse(`Cannot find Department with ID '${req.params.id}'.`, 400)
        );
    }

    department = await department.update({
        name,
        short,
        isVisible
    });

    res.status(200).json({
        success: true,
        data: {
            department
        }
    });
});