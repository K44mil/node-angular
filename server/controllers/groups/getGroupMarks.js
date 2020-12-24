const asyncHandler = require("../../middleware/asyncHandler");
const Mark = require('../../models/Mark');
const User = require("../../models/User");
const { Op } = require('sequelize');
const UserGroup = require("../../models/relationsModels/UserGroup");
const Group = require("../../models/Group");
const ErrorResponse = require("../../utils/ErrorResponse");
const StudentNote = require("../../models/StudentNote");

/**
 * @desc    Get group marks
 * @route   GET /api/v1/groups/:id/marks
 * @access  Private/Admin
 */
exports.getGroupMarks = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id);
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }

    // const members = await UserGroup.findAll({
    //     where: {
    //         groupId: {
    //             [Op.eq]: group.id
    //         },
    //         isConfirmed: {
    //             [Op.eq]: 1
    //         }
    //     },
    //     include: {
    //         model: User,
    //         attributes: ['id', 'firstName', 'lastName', 'albumNumber'],
    //         include: [
    //             {
    //                 model: Mark
    //             },
    //         ]
    //     },
    //     order: [
    //         [User, 'lastName', 'ASC']
    //     ]
    // });

    const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'albumNumber'],
        include: [
            {
                model: UserGroup,
                where: { isConfirmed: { [Op.eq]: 1 }, groupId: { [Op.eq]: group.id }}
            }
        ],
        order: [
            ['lastName', 'ASC'],
            ['firstName', 'ASC']
        ]
    });

    const members = []
    for (const u of users) {
        const m = u.toJSON();
        m.marks = await Mark.findAll({ where: { userId: { [Op.eq]: u.id }, groupId: { [Op.eq]: group.id }}, order: [['created_at', 'DESC']] });
        m.note = await StudentNote.findOne({ where: { userId: { [Op.eq]: u.id }, groupId: { [Op.eq]: group.id }} });

        delete m.UserGroup;
        members.push(m);
    }

    res.status(200).json({
        success: true,
        data: {
            members
        }
    });
});