const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const User = require('../../models/User');

/**
 * @desc    Update user data
 * @route   PUT /api/v1/auth/me
 * @access  Private
 */
exports.updateMe = asyncHandler(async (req, res, next) => {
    let { email, firstName, lastName } = req.body;
    let user = await User.findByPk(req.user.id);

    if (!user) {
        return next(
            new ErrorResponse('User does not exist.', 400)
        )
    }

    if (!email) email = user.email;
    if (!firstName) firstName = user.firstName;
    if (!lastName) lastName = user.lastName;

    user = await user.update({
        email,
        firstName,
        lastName,
    });

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});