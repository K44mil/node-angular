const { Op } = require("sequelize");
const asyncHandler = require("../../middleware/asyncHandler");
const Course = require("../../models/Course");
const Group = require("../../models/Group");
const Specialization = require("../../models/Specialization");
const Subject = require("../../models/Subject");

/**
 * @desc    Get Open Groups
 * @route   GET /api/v1/groups/open
 * @access  Public
 */
exports.getOpenGroups = asyncHandler(async (req, res, next) => {
    const groups = await Group.findAll({
        where: {
            isOpen: {
                [Op.eq]: 1
            }
        },
        include: [
            {
                model: Course,
                attributes: ['id', 'name']
            },
            {
                model: Specialization,
                attributes: ['id', 'name']
            },
            {
                model: Subject,
                attributes: ['id', 'name']
            }
        ]
    });

    res.status(200).json({
        success: true,
        data: {
            groups
        }
    });
});