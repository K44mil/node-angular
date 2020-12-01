const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const File = require('../../models/File');
const path = require('path');
const fs = require('fs');

/**
 * @desc    Delete File
 * @route   DELETE /api/v1/files/:id
 * @access  Private/Admin
 */
exports.deleteFile = asyncHandler(async (req, res, next) => {
    const file = await File.findByPk(req.params.id);
    if (!file) {
        return next(
            new ErrorResponse('File does not exist.', 400)
        )
    }

    const filePath = path.join(path.resolve(__dirname, '../..'), file.path);
    fs.unlinkSync(filePath);
    await file.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});