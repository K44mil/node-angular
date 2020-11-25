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
    let course = await Course.findByPk(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`Cannot find Course with ID '${req.params.id}'.`, 400)
        );
    }

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    let existingCourse = await Course.findOne({
        where: {
            [Op.or]: [
                {
                    name: { [Op.like]: name }
                },
                {
                    short: { [Op.like]: short }
                }
            ]
        }
    });

    if (existingCourse) {
        return next(
            new ErrorResponse('Course with this name or short already exists.', 400)
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