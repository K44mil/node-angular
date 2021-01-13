const asyncHandler = require('../../middleware/asyncHandler');
const path = require('path');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/ErrorResponse');
const fs = require('fs');

/**
 * @desc    Delete user avatar
 * @route   GET /api/v1/auth/delete_avatar
 * @access  Private
 */
exports.deleteAvatar = asyncHandler(async (req, res, next) => {
    let user = await User.findByPk(req.user.id);

    if (user.avatar) 
        fs.unlink(`./public/uploads/avatars/${user.avatar}`, () => {});
    
    user.avatar = null;
    user = await user.save();

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});