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

    // PASSWORD VALIDATION
    if (password !== confirmPassword) {
        return next(
            new ErrorResponse(`Passwords must be identical.`, 400)
        );
    }

    if (password.length < 8 || password.length > 16) {
        return next(
            new ErrorResponse(`Password length must be between 8 and 16 characters.`, 400)
        );
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)) {
        return next(
            new ErrorResponse(`The password must contain upper and lower case letters, a number and a special character.`, 400)
        );
    }

    if (acceptTerms !== true) {
        return next(
            new ErrorResponse(`You must accept Terms and Conditions.`, 400)
        );
    }

    // First Name & Last Name validation
    if (firstName.length > 30 || !firstName.match(/([a-zA-Z])$/)) {
        return next(
            new ErrorResponse('First Name cannot be longer than 30 charactes and it cannot contains any special characters or digits.')
        )
    }

    if (lastName.length > 30 || !lastName.match(/([a-zA-Z])$/)) {
        return next(
            new ErrorResponse('Last Name cannot be longer than 30 charactes and it cannot contains any special characters or digits.')
        )
    }

    // Check if user exists
    let user = await User.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    if (user) {
        return next(
            new ErrorResponse(`User with provided email already exists.`, 400)
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

    await user.save();

    res.status(200).json({
        success: true,
        data: { }
    });

    const message = `Your account was created.
        It has to be verified by the administrator.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Registration',
            message
        });
        
    } catch (err) {
        console.log(err);

        return next(
            new ErrorResponse(`Email could not be sent`, 500)
        );
    }
});