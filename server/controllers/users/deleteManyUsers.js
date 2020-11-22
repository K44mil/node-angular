const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Role = require('../../models/Role');

/**
 * @desc    Delete many users
 * @route   POST /api/v1/users/delete_many
 * @access  Private/Admin
 */
exports.deleteManyUsers = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one user.', 400)
        )
    }

    let countDeleted = 0;
    for (const id of ids) {
        const user = await User.findByPk(id);
        if (user && user.role !== Role.Admin) {
            await user.destroy();
            countDeleted++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countDeleted} of ${ids.length} users have been successfully deleted.`
        }
    });
});