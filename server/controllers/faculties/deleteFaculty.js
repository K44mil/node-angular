const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Faculty = require('../../models/Faculty');

/**
 * @desc    Delete Faculty
 * @route   DELETE /api/v1/faculties/:id
 * @access  Private/Admin
 */
exports.deleteFaculty = asyncHandler(async (req, res, next) => {
    let faculty = await Faculty.findByPk(req.params.id);

    if (!faculty) {
        return next(
            new ErrorResponse(`Cannot find Faculty with ID '${req.params.id}'.`, 400)
        );
    }
    await faculty.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});