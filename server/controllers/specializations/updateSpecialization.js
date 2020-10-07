const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');

/**
 * @desc    Update Specialization
 * @route   PUT /api/v1/specializations/:id
 * @access  Private/Admin
 */
exports.updateSpecialization = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;
    let specialization = await Specialization.findByPk(req.params.id);

    if (!specialization) {
        return next(
            new ErrorResponse(`Cannot find Specialization with ID '${req.params.id}'.`, 400)
        );
    }

    await specialization.update({
        name,
        short,
        isVisible
    });

    res.status(200).json({
        success: true,
        data: {
            specialization
        }
    });
});