const asyncHandler = require('../../middleware/asyncHandler');
const path = require('path');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');

/**
 * @desc    Change user avatar
 * @route   PUT /api/v1/auth/change_avatar
 * @access  Private
 */
exports.changeAvatar = asyncHandler(async (req, res, next) => {
    let user = await User.findByPk(req.user.id);

    if (!req.files) {
        return next(
            new ErrorResponse('Please upload an image file', 400)
        );
    }

    if (req.files && req.files.avatar) {
        const file = req.files.avatar;

        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload an image file`, 400));
        }

        if (file.size > process.env.MAX_AVATAR_UPLOAD) {
            return next(
              new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_AVATAR_UPLOAD}`,
                400
              )
            );
        }

        file.name = `avatar_${user.id}${path.parse(file.name).ext}`;

        file.mv(`${process.env.AVATAR_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(new ErrorResponse(`File upload error`, 500));
            }
        });

        user.avatar = file.name;
    }
    user = await user.save();

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});