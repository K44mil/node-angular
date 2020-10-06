const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');

/**
 * @desc    Get single user by id
 * @route   GET /api/v1/users/:id
 * @access  Private/Admin
 */
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return next(
            new ErrorResponse(`User does not exist.`, 404)
        )
    }

    res.status(200).json({
        success: true,
        data: {
            user
        }
    })
});