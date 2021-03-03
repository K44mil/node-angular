const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');
const Course = require('../../models/Course');
const { Op } = require('sequelize');

/**
 * @desc    Create Specialization
 * @route   POST /api/v1/specializations
 * @access  Private/Admin
 */
exports.createSpecialization = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible, courseId } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    const course = await Course.findByPk(courseId);
    if (!course)
        return next(new ErrorResponse('Provided course does not exist.', 400));

    if (course.isArchive)
        return next(new ErrorResponse('Provided course is archival.', 400));

    let specialization = await Specialization.findOne({
        where: {
            courseId: {
                [Op.eq]: course.id
            },
            [Op.or]: [
                {
                    name: { [Op.like]: name }
                },
                {
                    short: { [Op.like]: short }
                }
            ],
        }
    });

    if (specialization) {
        return next(
            new ErrorResponse(`Specialization with this name or short for course '${course.name}' already exists.`, 400)
        )
    }

    specialization = await Specialization.build({
        name,
        short,
        isVisible,
        courseId: course.id
    });
    await specialization.save();

    res.status(200).json({
        success: true,
        data: {
            specialization
        }
    });
});