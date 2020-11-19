const asyncHandler = require('../../middleware/asyncHandler');

/**
 * @desc    Check if request user is admin
 * @route   GET /api/v1/auth/admin
 * @access  Private/Admin
 */
exports.isAdmin = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: { } 
    });
});