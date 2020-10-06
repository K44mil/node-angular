const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const { Op } = require('sequelize');
const User = require('../../models/User');
const Role = require('../../models/Role');

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register_user
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
    const {
        email,
        password,
        confirmPassword,
        acceptTerms,
        firstName,
        lastName
    } = req.body;

    if (!email || !password || !confirmPassword
        || !acceptTerms || !firstName || !lastName) {
        return next(
            new ErrorResponse(`All fields are required.`, 400)
        );
    }

    if (password !== confirmPassword) {
        return next(
            new ErrorResponse(`Passwords must be identical.`, 400)
        );
    }

    if (acceptTerms !== true) {
        return next(
            new ErrorResponse(`You must accept Terms and Conditions.`, 400)
        );
    }

    let user = await User.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    if (user) {
        return next(
            new ErrorResponse(`Email in use.`, 400)
        );
    }

    user = await User.build({
        email,
        password,
        role: Role.User,
        firstName,
        lastName
    });
    await user.hashPassword();

    const message = `Your account was created.
        It has to be verified by the administrator.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Registration',
            message
        });

        await user.save();

        res.status(200).json({
            success: true,
            data: { }
        });
    } catch (err) {
        console.log(err);

        return next(
            new ErrorResponse(`Email could not be sent`, 500)
        );
    }
});