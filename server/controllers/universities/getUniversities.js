const asyncHandler = require('../../middleware/asyncHandler');
const University = require('../../models/University');

/**
 * @desc    Get Universities
 * @route   GET /api/v1/universities
 * @access  Private/Admin
 */
exports.getUniversities = asyncHandler(async (req, res, next) => {
    const universities =  await University.findAll();

    res.status(200).json({
        success: true,
        data: {
            universities
        }
    })
});