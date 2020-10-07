const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Faculty = require('../../models/Faculty');

/**
 * @desc    Update Faculty
 * @route   PUT /api/v1/faculties/:id
 * @access  Private/Admin
 */
exports.updateFaculty = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;
    let faculty = await Faculty.findByPk(req.params.id);

    if (!faculty) {
        return next(
            new ErrorResponse(`Cannot find Faculty with ID '${req.params.id}'.`, 400)
        );
    }

    await faculty.update({
        name,
        short,
        isVisible
    });

    res.status(200).json({
        success: true,
        data: {
            faculty
        }
    });
});