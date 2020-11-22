const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Close Group
 * @route   GET /api/v1/groups/:id/close
 * @access  Private/Admin
 */
exports.closeGroup = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );
    }

    group.isOpen = false;
    await group.save();

    res.status(200).json({
        success: true,
        data: { }
    });
});