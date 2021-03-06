const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/User');

/**
 * @desc    Change password
 * @route   PUT /api/v1/auth/change_password
 * @access  Private
 */
exports.changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, password, confirmPassword } = req.body;

    if (!oldPassword || !password || !confirmPassword) {
        return next(
            new ErrorResponse(`All fields are required.`, 400)
        );
    }

    const user = await User.findByPk(req.user.id);
    const isOldPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isOldPasswordCorrect) {
        return next(
            new ErrorResponse(`Wrong password.`, 400)
        );
    }

    if (password !== confirmPassword) {
        return next(
            new ErrorResponse(`Passwords must be identical.`, 400)
        );
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)) {
        return next(
            new ErrorResponse(`The password must contain upper and lower case letters, a number and a special character.`, 400)
        );
    }

    user.password = password;
    await user.hashPassword();
    await user.save();

    res.status(200).json({
        success: true,
        data: { }
    });
});