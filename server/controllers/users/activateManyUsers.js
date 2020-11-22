const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Role = require('../../models/Role');

/**
 * @desc    Activate many users
 * @route   POST /api/v1/users/activate_many
 * @access  Private/Admin
 */
exports.activateManyUsers = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one user.', 400)
        )
    }

    let countActivated = 0;
    for (const id of ids) {
        const user = await User.findByPk(id);
        if (user) {
            user.isVerified = true;
            await user.save();
            countActivated++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countActivated} of ${ids.length} users have been successfully activated.`
        }
    });
});