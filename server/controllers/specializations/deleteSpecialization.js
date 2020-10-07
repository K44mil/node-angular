const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');

/**
 * @desc    Delete Specialization
 * @route   DELETE /api/v1/specializations/:id
 * @access  Private/Admin
 */
exports.deleteSpecialization = asyncHandler(async (req, res, next) => {
    let specialization = await Specialization.findByPk(req.params.id);

    if (!specialization) {
        return next(
            new ErrorResponse(`Cannot find Specialization with ID '${req.params.id}'.`, 400)
        );
    }
    await specialization.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});