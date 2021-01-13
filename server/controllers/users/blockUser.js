const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/User');
const Role = require('../../models/Role');

/**
 * @desc    Block user
 * @route   GET /api/v1/users/block/:id
 * @access  Private/Admin
 */
exports.blockUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse(`User does not exist.`, 404)
        )
    }

    if (user.role === Role.Admin) {
        return next(
            new ErrorResponse(`You cannot block an admin account`, 400)
        )
    }

    if (user.isBlocked === true) {
        return next(
            new ErrorResponse(`User is already blocked.`, 400)
        )
    }

    user.isBlocked = true;
    await user.save();

    res.status(200).json({
        success: true,
        data: {}
    });

    const message = `<p>Your account has been blocked by the Administrator.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Account blocked.',
            html: message
        }); 
    } catch (err) { }
});