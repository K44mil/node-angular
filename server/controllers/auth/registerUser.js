const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const { Op } = require('sequelize');
const User = require('../../models/User');
const Role = require('../../models/Role');
const { validateUser } = require('../../utils/validators');

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register_user
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { email, password, confirmPassword, acceptTerms, firstName, lastName } = req.body;

    const userForValidation = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        role: Role.User
    };

    const validation = validateUser(userForValidation);
    if (validation.success === false)
        return next(new ErrorResponse(validation.message));

    if (!acceptTerms || acceptTerms !== true)
        return next(new ErrorResponse('You have to accept the terms.'));

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