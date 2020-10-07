const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');

/**
 * @desc    Create Specialization
 * @route   POST /api/v1/specializations
 * @access  Private/Admin
 */
exports.createSpecialization = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    const specialization = await Specialization.build({
        name,
        short,
        isVisible
    });
    await specialization.save();

    res.status(201).json({
        success: true,
        data: {
            specialization
        }
    });
});