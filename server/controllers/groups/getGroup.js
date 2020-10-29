const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const { Op } = require('sequelize');

/**
 * @desc    Get Group Details [for Admin]
 * @route   POST /api/v1/group/:id
 * @access  Private/Admin
 */
exports.getGroup = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            group
        }
    });
});