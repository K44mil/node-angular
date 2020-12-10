const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Course = require('../../models/Course');
const { Op } = require('sequelize');

/**
 * @desc    Update Course
 * @route   PUT /api/v1/courses/:id
 * @access  Private/Admin
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;
    const course = await Course.findByPk(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`Course does not exist.`, 400)
        );
    }

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    // Check if course with name exists
    let existingCourse = await Course.findOne({
        where: {
            name: {
                [Op.like]: name
            }
        }
    });
    if (existingCourse && existingCourse.id !== course.id) {
        return next(
            new ErrorResponse('Course with this name already exists.', 400)
        )
    }

    // Check if course with short exists
    existingCourse = await Course.findOne({
        where: {
            short: {
                [Op.like]: short
            }
        }
    });
    if (existingCourse && existingCourse.id !== course.id) {
        return next(
            new ErrorResponse('Course with this short already exists.', 400)
        )
    }

    await course.update({
        name,
        short,
        isVisible
    });

    res.status(200).json({
        success: true,
        data: {
            course
        }
    });
});