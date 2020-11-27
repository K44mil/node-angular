const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');
const File = require('../../models/File');
const path = require('path');

/**
 * @desc    Download File
 * @route   GET /api/v1/files/download/:id
 * @access  [Private/Public]
 */
exports.downloadFile = asyncHandler(async (req, res, next) => {
    const file = await File.findByPk(req.params.id);

    if (!file) {
        return next(
            new ErrorResponse('File does not exist.', 400)
        );
    }

    const user = await getLoggedUser(req);

    if (file.isLoginProtected && !user) {
        return next(
            new ErrorResponse(`Not authorized.`, 401)
        );
    }

    const filePath = `${path.join(path.resolve(__dirname, '../..'), `${file.path}`)}`;
    // console.log(file.id);

    res.download(filePath);
});