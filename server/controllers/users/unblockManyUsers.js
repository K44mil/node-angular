const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Role = require('../../models/Role');

/**
 * @desc    Unblock many users
 * @route   POST /api/v1/users/unblock_many
 * @access  Private/Admin
 */
exports.unblockManyUsers = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one user.', 400)
        )
    }

    let countUnblocked = 0;
    for (const id of ids) {
        const user = await User.findByPk(id);
        if (user && user.role !== Role.Admin) {
            user.isBlocked = false;
            await user.save();
            countUnblocked++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countUnblocked} of ${ids.length} users have been successfully unblocked.`
        }
    });
});