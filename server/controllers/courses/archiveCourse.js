const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const Specialization = require('../../models/Specialization');
const Subject = require('../../models/Subject');
const { Op } = require('sequelize');

/**
 * @desc    Archive Course
 * @route   GET /api/v1/courses/:id/archive
 * @access  Private/Admin
 */
exports.archiveCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`Cannot find Course with ID '${req.params.id}'.`, 400)
        );
    }

    course.isArchive = true;
    await course.save();

    // Archive all specializations
    const specializations = await Specialization.findAll(
        { where: { courseId: { [Op.eq]: course.id }} }
    );
    for (const spec of specializations) {
        // Archive all subjects
        spec.isArchive = true;
        await spec.save();
        await Subject.update(
            { isArchive: true },
            { where: { specializationId: { [Op.eq]: spec.id }} }
        );
    }

    res.status(200).json({
        success: true,
        data: {
            course
        }
    });
});