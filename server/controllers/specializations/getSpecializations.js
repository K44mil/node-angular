const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');

/**
 * @desc    Get Specializations
 * @route   GET /api/v1/specializations
 * @access  Private/Admin
 */
exports.getSpecializations = asyncHandler(async (req, res, next) => {
    const specializations = await Specialization.findAll();

    res.status(200).json({
        success: true,
        data: {
            specializations
        }
    });
});
