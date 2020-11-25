const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');
const Course = require('../../models/Course');

/**
 * @desc    Get Specialization by ID
 * @route   GET /api/v1/specializations/:id
 * @access  Private/Admin
 */
exports.getSpecialization = asyncHandler(async (req, res, next) => {
    const specialization = await Specialization.findByPk(req.params.id);

    if (!specialization) {
        return next(
            new ErrorResponse(`Cannot find Specialization with ID '${req.params.id}'.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            specialization
        }
    });
});