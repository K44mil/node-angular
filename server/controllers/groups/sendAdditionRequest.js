const asyncHandler = require("../../middleware/asyncHandler");
const Group = require("../../models/Group");
const UserGroup = require("../../models/relationsModels/UserGroup");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const Event = require('../../models/Event');
const { Op } = require('sequelize');
const Presence = require('../../models/Presence');

/**
 * @desc    Send Addition Request
 * @route   GET /api/v1/groups/:id/send_request
 * @access  Private/Student
 */
exports.sendAdditionRequest = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }
    if (!group.isOpen) {
        return next(
            new ErrorResponse('Group is closed. Cannot send request for addition.', 400)
        )
    }

    const user = req.user;

    // Check if addition request sent
    const additionRequest = await UserGroup.findOne({
        where: {
            isConfirmed: {
                [Op.eq]: 0
            },
            userId: {
                [Op.eq]: user.id
            },
            groupId: {
                [Op.eq]: group.id
            }
        }
    });

    if (additionRequest) {
        return next(
            new ErrorResponse('You sent addition request for this group.', 400)
        )
    }

    // Check if user is in this group
    const userGroup = await UserGroup.findOne({
        where: {
            isConfirmed: {
                [Op.eq]: 1
            },
            userId: {
                [Op.eq]: user.id
            },
            groupId: {
                [Op.eq]: group.id
            }
        }
    });

    if (userGroup) {
        return next(
            new ErrorResponse('You already belong to this group.', 400)
        )
    }

    await UserGroup.create({
        userId: user.id,
        groupId: group.id
    });

    res.status(200).json({
        success: true,
        data: { }
    });
});