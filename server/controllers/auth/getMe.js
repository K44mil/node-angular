const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const { Op } = require('sequelize');
const User = require('../../models/User');

/**
 * @desc    Get logged user data
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.user.id);

    res.status(200).json({
        success: true,
        data: {
            user
        }
    })
});