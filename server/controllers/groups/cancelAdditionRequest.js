const asyncHandler = require("../../middleware/asyncHandler");
const Group = require("../../models/Group");
const UserGroup = require("../../models/relationsModels/UserGroup");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const { Op } = require('sequelize');
const Role = require("../../models/Role");

/**
 * @desc    Cancel Addition Request
 * @route   GET /api/v1/groups/cancel_request/:id
 * @access  Private/Student
 */
exports.cancelAdditionRequest = asyncHandler(async (req, res, next) => {
    const additionRequest = await UserGroup.findByPk(req.params.id);

    if (!additionRequest) {
        return next(
            new ErrorResponse('Addition request does not exist.', 400)
        )
    }

    if (additionRequest.isConfirmed) {
        return next(
            new ErrorResponse('Addition request does not extis.', 400)
        )
    }

    const user = req.user;

    if (additionRequest.userId !== user.id && user.role !== Role.Admin) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        )
    }

    await additionRequest.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});