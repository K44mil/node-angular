const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/User');

/**
 * @desc    Unblock user
 * @route   PUT /api/v1/users/unblock/:id
 * @access  Private/Admin
 */
exports.blockUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse(`User does not exist.`, 404)
        )
    }

    if (user.isBlocked === false) {
        return next(
            new ErrorResponse(`User isn't blocked.`, 400)
        )
    }

    user.isBlocked = false;
    await user.save();

    const message = `Administrator has just unblocked your account.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Account unblocked.',
            message
        });

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.log(err);

        return next(
            new ErrorResponse(`Email could not be sent`, 500)
        );
    }
});