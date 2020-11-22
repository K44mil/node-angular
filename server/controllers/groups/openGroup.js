const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Open Group
 * @route   GET /api/v1/groups/:id/open
 * @access  Private/Admin
 */
exports.openGroup = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );
    }

    group.isOpen = true;
    await group.save();

    res.status(200).json({
        success: true,
        data: { }
    });
});