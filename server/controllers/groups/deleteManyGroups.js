const asyncHandler = require("../../middleware/asyncHandler");
const Group = require('../../models/Group');
const UserGroup = require("../../models/relationsModels/UserGroup");
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * @desc    Delete Many Group
 * @route   POST /api/v1/groups/delete_many
 * @access  Private/Admin
 */
exports.deleteManyGroups = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one group.', 400)
        )
    }

    let countDeleted = 0;
    for (const id of ids) {
        const group = await Group.findByPk(id);
        if (group) {
            await group.destroy();
            countDeleted++;
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countDeleted} of ${ids.length} groups have been successfully deleted.`
        }
    });
});