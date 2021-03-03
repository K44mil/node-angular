const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Backup = require('../../models/Backup');

/**
 * @desc    Get Backup
 * @route   GET /api/v1/backup
 * @access  Private/Admin
 */
exports.getBackup = asyncHandler(async (req, res, next) => {
    const backup = await Backup.findOne({});

    res.status(200).json({
        success: true,
        data: {
            backup
        }
    });
});