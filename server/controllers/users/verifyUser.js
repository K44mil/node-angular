const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/User');

/**
 * @desc    Verify user account
 * @route   PUT /api/v1/users/verify/:id
 * @access  Private/Admin
 */
exports.verifyUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse(`User does not exist.`, 404)
        )
    }

    if (user.isVerified === true) {
        return next(
            new ErrorResponse(`User is already verified.`, 400)
        )
    }

    user.isVerified = true;
    await user.save();

    const message = `Admin has just verified your account.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Account verified.',
            message
        });

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.log(err);
    }
});