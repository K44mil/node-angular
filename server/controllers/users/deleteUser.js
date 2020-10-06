const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse(`User does not exist.`, 404)
        )
    }

    await user.destroy();

    res.status(200).json({
        success: true,
        data: {}
    });
});