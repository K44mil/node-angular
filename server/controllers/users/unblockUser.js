const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/User');

/**
 * @desc    Unblock user
 * @route   GET /api/v1/users/unblock/:id
 * @access  Private/Admin
 */
exports.unblockUser = asyncHandler(async (req, res, next) => {
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

    res.status(200).json({
        success: true,
        data: {}
    });

    const message = `<p>Your account has been unblocked by the Administrator.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Account unblocked.',
            html: message
        }); 
    } catch (err) { }
});