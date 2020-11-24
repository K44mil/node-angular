const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Close Many Group
 * @route   POST /api/v1/groups/close_many
 * @access  Private/Admin
 */
exports.closeManyGroups = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one group.', 400)
        )
    }

    let countClosed = 0;
    for (const id of ids) {
        const group = await Group.findByPk(id);
        if (group) {
            group.isOpen = false;
            await group.save();
            countClosed++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countClosed} of ${ids.length} groups have been successfully closed.`
        }
    });
});