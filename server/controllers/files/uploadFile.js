const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const File = require('../../models/File');
const path = require('path');

/**
 * @desc    Upload File
 * @route   POST /api/v1/files/upload
 * @access  Private/Admin
 */
exports.uploadFile = asyncHandler(async (req, res, next) => {
    if (!req.files || !req.files.file) {
        return next(
            new ErrorResponse('Please upload a file.', 400)
        )
    }

    const file = req.files.file;

    const allowedExtensions = new String(process.env.ALLOWED_FILE_EXTENSIONS).split(',');
    fileExt = path.parse(file.name).ext;
    if (!allowedExtensions.includes(fileExt)) {
        return next(
            new ErrorResponse('This file extension is not allowed.', 400)
        )
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse('File size is too big.', 400)
        )
    }
    
    const createdFile = await File.build({
        name: file.name,
        type: file.mimetype,
        size: String(file.size)
    });
    
    createdFile.path = `${process.env.FILE_UPLOAD_PATH}/${createdFile.id}${fileExt}`;
    file.mv(`./${createdFile.path}`, err => {
        console.log(err);
    });

    await createdFile.save();
    
    res.status(200).json({
        success: true,
        data: {
            file: createdFile
        }
    });
});