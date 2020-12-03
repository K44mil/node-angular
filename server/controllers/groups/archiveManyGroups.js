const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Archive Many Group
 * @route   POST /api/v1/groups/archive_many
 * @access  Private/Admin
 */
exports.archiveManyGroups = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one group.', 400)
        )
    }

    let countArchived = 0;
    for (const id of ids) {
        const group = await Group.findByPk(id);
        if (group) {
            group.isArchive = true;
            await group.save();
            countArchived++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countArchived} of ${ids.length} groups have been successfully archived.`
        }
    });
});