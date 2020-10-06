const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');

/**
 * @desc    Create user
 * @route   POST /api/v1/users
 * @access  Private/Admin
 */
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.build(req.body);
    await user.hashPassword();
    await user.save();

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});