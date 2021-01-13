const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/User');
const { Op } = require('sequelize');
const crypto = require('crypto');

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot_password
 * @access  Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: {
                [Op.eq]: req.body.email
            }
        }
    });

    if (!user) {
        return next(
            new ErrorResponse(`User with that email does not exist.`, 404)
        );
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetPasswordUrl = `${req.protocol}://${process.env.CLIENT_NAME}/account/reset_password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has
        requested the reset of password. <br><br> <a href="${resetPasswordUrl}">Reset password</a>`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Reset Password Token',
            html: message
        });

        res.status(200).json({
            success: true,
            data: {
                message: `Email has been sent. Please check your mailbox.`
            }
        });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return next(
            new ErrorResponse(`Email could not be sent`, 500)
        );
    }
});