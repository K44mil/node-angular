const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');

/**
 * @desc    Get Subjects
 * @route   GET /api/v1/subjects
 * @access  Private/Admin
 */
exports.getSubjects = asyncHandler(async (req, res, next) => {
    const subjects = await Subject.findAll();

    res.status(200).json({
        success: true,
        data: {
            subjects
        }
    });
});
