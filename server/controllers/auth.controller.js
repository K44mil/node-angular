const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const sendEmail = require('../utils/sendEmail');
const { Op } = require('sequelize');
const User = require('../models/User');
const Role = require('../models/Role');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { email,
            password,
            confirmPassword,
            role,
            acceptTerms, 
            firstName, 
            lastName,
            albumNumber } = req.body;

    if (!email || !password || !confirmPassword || !role ||
        !acceptTerms || !firstName || !lastName) {
            return next(
                new ErrorResponse(`WSZYSTKIE POLA SĄ WYMAGANE`, 400)
            );
    }

    if (password !== confirmPassword) {
        return next(
            new ErrorResponse(`Hasla musza byc takie same`, 400)
        );
    }

    if (acceptTerms !== true) {
        return next(
            new ErrorResponse(`Warunki musza byc zaakceptowane`, 400)
        );
    }

    let user = await User.findAll({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    if(user.length > 0) {
        return next(
            new ErrorResponse('EMAIL W BAZIE', 400)
        );
    }

    switch(role) {
        case Role.User:
            user = await User.build({
                email,
                password,
                role,
                firstName,
                lastName
            });
            await user.hashPassword();
            await user.save();
            break;
        case Role.Student:
            if (!albumNumber) {
                return next(
                    new ErrorResponse(`Numer albumu wymagany dla studenta`, 400)
                );
            }
            user = await User.create({
                email,
                password,
                role,
                firstName,
                lastName,
                albumNumber
            });
            await user.hashPassword();
            await user.save();
            break;
        default:
            return next(
                new ErrorResponse(`NIEPOPRAWNA ROLA`, 400)
            );
    }
    
    // const message = 'Email test.';
    // try {
    //     await sendEmail({
    //         email: 'k44mil155@gmail.com',
    //         subject: 'Email subject',
    //         message
    //     })
    // } catch (err) {

    // }
    
    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});

// @desc    Login user
// @route   POST /api/v1/auth/register
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new ErrorResponse(`EMAIL I HASLO POTRZEBNE DO ZALOGOWANIA`, 400)
        );
    }

    const user = await User.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    if (!user) {
        return next(
            new ErrorResponse(`USER NIE ISTNIEJE`, 400)
        );
    }

    if (!user.isVerified) {
        return next(
            new ErrorResponse(`USER NIEAKTYWNY`, 400)
        );
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return next(
            new ErrorResponse(`NIEPOPRAWNE HASLO`, 400)
        );
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        data: {
            user,
            token
        }
    })
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    let user = await User.findOne({
        where: {
            id: {
                [Op.eq]: req.user.id
            }
        }
    });
    
    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});