const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const Faculty = require('../../models/Faculty');

/**
 * @desc    Get Faculties
 * @route   GET /api/v1/faculties
 * @access  Private/Admin
 */
exports.getFaculties = asyncHandler(async (req, res, next) => {
    const faculties = await Faculty.findAll();

    res.status(200).json({
        success: true,
        data: {
            faculties
        }
    });
});
