const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const University = require('../../models/University');

/**
 * @desc    Update University
 * @route   PUT /api/v1/universities/:id
 * @access  Private/Admin
 */
exports.updateUniversity = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;
    let university = await University.findByPk(req.params.id);

    if (!university) {
        return next(
            new ErrorResponse(`Cannot find University with ID '${req.params.id}'.`, 400)
        );
    }

    await university.update({
        name,
        short,
        isVisible
    });

    res.status(200).json({
        success: true,
        data: {
            university
        }
    });
});