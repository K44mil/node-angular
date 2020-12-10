const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');
const Specialization = require('../../models/Specialization');
const { Op } = require('sequelize');

/**
 * @desc    Update Subject
 * @route   PUT /api/v1/subjects/:id
 * @access  Private/Admin
 */
exports.updateSubject = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible, specializationId } = req.body;

    let subject = await Subject.findByPk(req.params.id);
    if (!subject) {
        return next(
            new ErrorResponse(`Cannot find Subject with ID '${req.params.id}'.`, 400)
        );
    }

    const specialization = await Specialization.findByPk(specializationId);
    if (!specialization) {
        return next(
            new ErrorResponse('Provided specialization does not exist.', 400)
        )
    }

    // Check if subject with name exists
    let existingSubject = await Subject.findOne({
        where: {
            specializationId: {
                [Op.eq]: specialization.id
            },
            name: {
                [Op.like]: name
            }
        }
    });
    if (existingSubject && existingSubject.id !== subject.id) {
        return next(
            new ErrorResponse(`Subject with this name already exists for specialization '${specialization.name}'`, 400)
        )
    }

    // Check if subject with short exists
    existingSubject = await Subject.findOne({
        where: {
            specializationId: {
                [Op.eq]: specialization.id
            },
            short: {
                [Op.like]: short
            }
        }
    });
    if (existingSubject && existingSubject.id !== subject.id) {
        return next(
            new ErrorResponse(`Subject with this short already exists for specialization '${specialization.name}'`, 400)
        )
    }

    await subject.update({
        name,
        short,
        isVisible,
        specializationId: specialization.id
    });

    res.status(200).json({
        success: true,
        data: {
            subject
        }
    });
});