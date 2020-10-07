const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Faculty = require('../../models/Faculty');

/**
 * @desc    Create Faculty
 * @route   POST /api/v1/faculties
 * @access  Private/Admin
 */
exports.createFaculty = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    const faculty = await Faculty.build({
        name,
        short,
        isVisible
    });
    await faculty.save();

    res.status(201).json({
        success: true,
        data: {
            faculty
        }
    });
});