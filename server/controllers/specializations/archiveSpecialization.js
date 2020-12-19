const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');

/**
 * @desc    Archive Specialization
 * @route   GET /api/v1/specializations/:id/archive
 * @access  Private/Admin
 */
exports.archiveSpecialization = asyncHandler(async (req, res, next) => {
    const specialization = await Specialization.findByPk(req.params.id);

    if (!specialization) {
        return next(
            new ErrorResponse(`Cannot find Specialization with ID '${req.params.id}'.`, 400)
        );
    }

    specialization.isArchive = true;
    await specialization.save();

    res.status(200).json({
        success: true,
        data: {
            specialization
        }
    });
});