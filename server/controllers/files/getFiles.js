const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const File = require('../../models/File');

/**
 * @desc    Get Files
 * @route   GET /api/v1/files
 * @access  Private/Admin
 */
exports.getFiles = asyncHandler(async (req, res, next) => {
    const files = await File.findAll();

    res.status(200).json({
        success: true,
        data: {
            files
        }
    });
});