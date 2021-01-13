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
            new ErrorResponse(`Invalid reset password token.`, 400)
        );
    }

    const { password, confirmPassword } = req.body;

    // @@@ Validate Password
    // Required:
    if (!password || password === '')
    return next(new ErrorRespone('Password is required.'), 400);

    // Pattern:
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/))
        return next(new ErrorRespone('The password must be at least 8 characters long and maximum 16 characters long, contains upper and lower case letters, a number and a special character.'), 400);

    // @@@ Validate Confirm Password
    // Required:
    if (!confirmPassword || confirmPassword === '')
        return next(new ErrorRespone('Confirm Password is required.'), 400);

    // Pattern:
    if (password !== confirmPassword)
        return next(new ErrorRespone('Passwords must be the same.'), 400);

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

    try {
        const html = `<p>Your password has been changed.</p>`;
        await sendEmail({
            email: user.email,
            subject: 'Password changed.',
            html: html
        });
    } catch (err) {

    }
});