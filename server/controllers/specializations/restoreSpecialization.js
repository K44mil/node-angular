const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Specialization = require('../../models/Specialization');
const Course = require('../../models/Course');
const Subject = require('../../models/Subject');
const { Op } = require('sequelize');

/**
 * @desc    Restore Specialization
 * @route   GET /api/v1/specializations/:id/restore
 * @access  Private/Admin
 */
exports.restoreSpecialization = asyncHandler(async (req, res, next) => {
    const specialization = await Specialization.findByPk(req.params.id);

    if (!specialization) {
        return next(
            new ErrorResponse(`Cannot find Specialization with ID '${req.params.id}'.`, 400)
        );
    }
    const course = await Course.findByPk(specialization.courseId);
    if (course && course.isArchive)
        return next(new ErrorResponse(`Cannot restore this specialization until course ${course.name} is archival.`, 400));

    specialization.isArchive = false;
    await specialization.save();

    // Restore all subjects
    await Subject.update(
        { isArchive: false },
        { where: { specializationId: { [Op.eq]: specialization.id }}}
    );

    res.status(200).json({
        success: true,
        data: {
            specialization
        }
    });
});