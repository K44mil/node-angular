const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Restore Many Group
 * @route   POST /api/v1/groups/restore_many
 * @access  Private/Admin
 */
exports.restoreManyGroups = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one group.', 400)
        )
    }

    let countRestored = 0;
    for (const id of ids) {
        const group = await Group.findByPk(id);
        if (group) {
            group.isArchive = false;
            await group.save();
            countRestored++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countRestored} of ${ids.length} groups have been successfully restored.`
        }
    });
});