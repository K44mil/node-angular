const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const { getLoggedUser } = require('../../middleware/auth');
const ErrorResponse = require('../../utils/ErrorResponse');
/**
 * @desc    Get logged user data
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await getLoggedUser(req);

    // const user = await User.findByPk(req.user.id);
    if (!user)
        return next(new ErrorResponse('Not authorized.', 400));

    res.status(200).json({
        success: true,
        data: {
            user
        }
    })
});