const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const { Op } = require('sequelize');
const Course = require('../../models/Course');
const Specialization = require('../../models/Specialization');
const Subject = require('../../models/Subject');

/**
 * @desc    Get Active Groups
 * @route   POST /api/v1/groups/active
 * @access  Private/Admin
 */
exports.getActiveGroups = asyncHandler(async (req, res, next) => {
    const groups = await Group.findAll({
        where: {
            isArchive: {
                [Op.eq]: 0
            }
        },
        include: [
            {
                model: Course,
                attributes: ['name']
            },
            {
                model: Specialization,
                attributes: ['name']
            },
            {
                model: Subject,
                attributes: ['name']
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