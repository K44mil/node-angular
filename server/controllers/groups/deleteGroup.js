const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Delete Group
 * @route   DELETE /api/v1/groups/:id
 * @access  Private/Admin
 */
exports.deleteGroup = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );
    }

    const id = group.id;
    await group.destroy();

    res.status(200).json({
        success: true,
        data: {
            id
        }
    });
});