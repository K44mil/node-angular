const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Open Many Group
 * @route   POST /api/v1/groups/open_many
 * @access  Private/Admin
 */
exports.openManyGroups = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one group.', 400)
        )
    }

    let countOpened = 0;
    for (const id of ids) {
        const group = await Group.findByPk(id);
        if (group) {
            group.isOpen = true;
            await group.save();
            countOpened++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countOpened} of ${ids.length} groups have been successfully open.`
        }
    });
});