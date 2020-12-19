const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');

/**
 * @desc    Restore Specialization
 * @route   GET /api/v1/specializations/:id/restore
 * @access  Private/Admin
 */
exports.restoreSpecialization = asyncHandler(async (req, res, next) => {
    const specialization = await Specialization.findByPk(req.params.id);

    if (!specialization) {
        return next(
            new ErrorResponse(`Cannot find Specialization with ID '${req.params.id}'.`, 400)
        );
    }

    specialization.isArchive = false;
    await specialization.save();

    res.status(200).json({
        success: true,
        data: {
            specialization
        }
    });
});