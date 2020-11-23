const asyncHandler = require("../../middleware/asyncHandler");
const Group = require("../../models/Group");
const UserGroup = require("../../models/relationsModels/UserGroup");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Reject request to group
 * @route   GET /api/v1/groups/request/:id/reject
 * @access  Private/Admin
 */
exports.rejectAdditionRequest = asyncHandler(async (req, res, next) => {
    const additionRequest = await UserGroup.findByPk(req.params.id);

    if (!additionRequest) {
        return next(
            new ErrorResponse('Request does not exist', 400)
        );
    }

    const group = await Group.findByPk(additionRequest.groupId);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist', 400)
        );
    }

    const user = await User.findByPk(additionRequest.userId);
    if (!user) {
        return next(
            new ErrorResponse('User does not exist', 400)
        );
    }

    await additionRequest.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});