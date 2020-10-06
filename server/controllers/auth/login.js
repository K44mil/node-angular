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
    const { email, password } = req.body;

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

    res.status(200).json({
        success: true,
        data: {
            user,
            token
        }
    });
});