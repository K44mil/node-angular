const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const User = require('../../models/User');

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password, remember } = req.body;

    if (!email || !password) {
        return next(
            new ErrorResponse(`Email and password are required.`, 400)
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
            new ErrorResponse(`Invalid credentials.`, 400)
        );
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return next(
            new ErrorResponse(`Invalid credentials.`, 400)
        );
    }

    if (!user.isVerified) {
        return next(
            new ErrorResponse(`Your account is inactive.`, 400)
        );
    }

    if (user.isBlocked) {
        return next(
            new ErrorResponse(`Your account is blocked.`, 400)
        );
    }

    const token = user.getSignedJwtToken();

    // Send cookie with token
    const options = {
        httpOnly: true,
    };

    // Remember option
    const days = 365;
    if (remember && remember === true)
        options.expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    if (process.env.NODE_ENV === 'production')
        options.secure = true;

    res.status(200).cookie('token', token, options).json({
        success: true,
        data: {
            user
        }
    });
});