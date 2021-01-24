const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Role = require('../../models/Role');
const { Op } = require('sequelize');

/**
 * @desc    Create user
 * @route   POST /api/v1/users
 * @access  Private/Admin
 */
exports.createUser = asyncHandler(async (req, res, next) => {
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        albumNumber
    } = req.body;

    if (!email || !password || !confirmPassword
        || !role || !firstName || !lastName) {
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

     // First Name & Last Name validation
     if (firstName.length > 30 || !firstName.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)) {
        return next(
            new ErrorResponse('First Name cannot be longer than 30 charactes and it cannot contains any special characters or digits.')
        )
    }

    if (lastName.length > 30 || !lastName.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)) {
        return next(
            new ErrorResponse('Last Name cannot be longer than 30 charactes and it cannot contains any special characters or digits.')
        )
    }

    // Role validation
    if (role !== Role.User && role !== Role.Student) {
        return next(
            new ErrorResponse('Provided role is incorrect.', 400)
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

    switch (role) {
        case Role.User:
            user = await User.build({
                email,
                password,
                role: Role.User,
                firstName,
                lastName,
                isVerified: true,
                isBlocked: false
            });
            break;
        case Role.Student:
            // Album Number validation
            if (!albumNumber.match(/^[0-9]{6}$/)) {
                return next(
                    new ErrorResponse('Album number must consist of exacly 6 digits.', 400)
                )
            }

            user = await User.findOne({
                where: {
                    albumNumber: {
                        [Op.eq]: albumNumber 
                    }
                }
            });

            if (user) {
                return next(
                    new ErrorResponse(`Student with provided album number already exists.`, 400)
                );
            }

            user = await User.build({
                email,
                password,
                role: Role.Student,
                firstName,
                lastName,
                albumNumber,
                isVerified: true,
                isBlocked: false
            });
            break;
    }

    
    await user.hashPassword();

    await user.save();

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});