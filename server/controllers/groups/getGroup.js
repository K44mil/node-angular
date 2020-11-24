const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const { Op } = require('sequelize');
const University = require('../../models/University');
const Department = require('../../models/Department');
const Faculty = require('../../models/Faculty');
const Specialization = require('../../models/Specialization');
const Course = require('../../models/Course');
const Subject = require('../../models/Subject');

/**
 * @desc    Get Group Details [for Admin]
 * @route   GET/api/v1/group/:id
 * @access  Private/Admin
 */
exports.getGroup = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id, {
        include: [
            // {
            //     model: University,
            //     attributes: ['name']
            // },
            // {
            //     model: Faculty,
            //     attributes: ['name']
            // },
            // {
            //     model: Department,
            //     attributes: ['name']
            // },
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