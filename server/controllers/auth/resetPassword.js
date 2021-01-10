const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');
const { Op } = require('sequelize');
const User = require('../../models/User');

/**
 * @desc    Reset password
 * @route   PUT /api/v1/auth/reset_password
 * @access  Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

    const user = await User.findOne({
        where: {
            resetPasswordToken: {
                [Op.eq]: resetPasswordToken
            },
            resetPasswordExpire: {
                [Op.gt]: Date.now()
            }
        }
    });

    if (!user) {
        return next(
            new ErrorResponse(`Invalid reset token.`, 400)
        );
    }

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return next(
            new ErrorResponse(`All fields are required.`, 400)
        );
    }

    if (password !== confirmPassword) {
        return next(
            new ErrorResponse(`Passwords must be identical.`, 400)
        );
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.hashPassword();
    await user.save();

    res.status(200).json({
        success: true,
        data: {
            message: 'Password has been changed.'
        }
    });
});