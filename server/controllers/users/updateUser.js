const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Role = require('../../models/Role');
const { Op } = require('sequelize');

/**
 * @desc    Update user
 * @route   PUT /api/v1/users/:id
 * @access  Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
    let {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        albumNumber
    } = req.body;

    let user = await User.findByPk(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse('User does not exist.', 400)
        )
    }

    if (user.role === Role.Admin) role = Role.Admin;

    if (!email || !role || !firstName || !lastName) {
        return next(
            new ErrorResponse(`All fields are required.`, 400)
        );
    }

    if (password && password !== '') {
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
    }

     // First Name & Last Name validation
     if (firstName.length > 30 || !firstName.match(/^[a-zA-Z]+$/)) {
        return next(
            new ErrorResponse('First Name cannot be longer than 30 charactes and it cannot contains any special characters or digits.')
        )
    }

    if (lastName.length > 30 || !lastName.match(/^[a-zA-Z]+$/)) {
        return next(
            new ErrorResponse('Last Name cannot be longer than 30 charactes and it cannot contains any special characters or digits.')
        )
    }

    // Role validation
    if (user.role !== Role.Admin && role !== Role.User && role !== Role.Student) {
        return next(
            new ErrorResponse('Provided role is incorrect.', 400)
        )
    }

    // Check if user with email exists
    let userExists = await User.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    if (userExists && userExists.id !== req.params.id) {
        return next(
            new ErrorResponse(`User with provided email already exists.`, 400)
        );
    }

    switch (role) {
        case Role.Admin:
        case Role.User:
            if (password && password !== '') {
                user.email = email;
                user.password = password;
                user.role = role;
                user.firstName = firstName;
                user.lastName = lastName;
                user.albumNumber = null;
                await user.hashPassword();
            } else {
                user.email = email;
                user.role = role;
                user.firstName = firstName;
                user.lastName = lastName;
                user.albumNumber = null;
            }         
            break;
        case Role.Student:
            // Album Number validation
            if (!albumNumber.match(/^[0-9]{6}$/)) {
                return next(
                    new ErrorResponse('Album number must consist of exacly 6 digits.', 400)
                )
            }

            userExists = await User.findOne({
                where: {
                    albumNumber: {
                        [Op.eq]: albumNumber 
                    }
                }
            });

            if (userExists && userExists.id !== req.params.id) {
                return next(
                    new ErrorResponse(`Student with provided album number already exists.`, 400)
                );
            }

            if (password && password !== '') {
                user.email = email;
                user.password = password;
                user.role = Role.Student;
                user.firstName = firstName;
                user.lastName = lastName;
                user.albumNumber = albumNumber;
                await user.hashPassword();
            } else {
                user.email = email;
                user.role = Role.Student;
                user.firstName = firstName;
                user.lastName = lastName;
                user.albumNumber = albumNumber;
            }
            break;
    }

    await user.save();

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});