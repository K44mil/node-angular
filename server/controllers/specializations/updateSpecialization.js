const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');
const { Op } = require('sequelize');
const Course = require('../../models/Course');
const Group = require('../../models/Group');

/**
 * @desc    Update Specialization
 * @route   PUT /api/v1/specializations/:id
 * @access  Private/Admin
 */
exports.updateSpecialization = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible, courseId } = req.body;
    let specialization = await Specialization.findByPk(req.params.id);

    if (!specialization) {
        return next(
            new ErrorResponse(`Cannot find Specialization with ID '${req.params.id}'.`, 400)
        );
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
        return next(
            new ErrorResponse('Provided course does not exist.', 400)
        )
    }

    // Check if specialization with name exists
    let existingSpecialization = await Specialization.findOne({
        where: {
            courseId: {
                [Op.eq]: course.id
            },
            name: {
                [Op.like]: name
            }
        }
    });
    if (existingSpecialization && existingSpecialization.id !== specialization.id) {
        return next(
            new ErrorResponse(`Specialization with this name already exists for course '${course.name}'`, 400)
        )
    }

    // Check if specialization with short exists
    existingSpecialization = await Specialization.findOne({
        where: {
            courseId: {
                [Op.eq]: course.id
            },
            short: {
                [Op.like]: short
            }
        }
    });
    if (existingSpecialization && existingSpecialization.id !== specialization.id) {
        return next(
            new ErrorResponse(`Specialization with this short already exists for course '${course.name}'`, 400)
        )
    }

    // Update groups props
    await Group.update({
        courseId: course.id
    }, {
        where: {
            specializationId: {
                [Op.eq]: specialization.id
            }
        }
    })

    specialization = await specialization.update({
        name,
        short,
        isVisible,
        courseId
    });

    res.status(200).json({
        success: true,
        data: {
            specialization
        }
    });
});