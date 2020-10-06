const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const University = require('../../models/University');

/**
 * @desc    Delete University
 * @route   DELETE /api/v1/universities/:id
 * @access  Private/Admin
 */
exports.deleteUniversity = asyncHandler(async (req, res, next) => {
    let university = await University.findByPk(req.params.id);

    if (!university) {
        return next(
            new ErrorResponse(`Cannot find University with ID '${req.params.id}'.`, 400)
        );
    }
    await university.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});