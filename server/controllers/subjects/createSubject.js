const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');
const Specialization = require('../../models/Specialization');
const { Op } = require('sequelize');

/**
 * @desc    Create Subject
 * @route   POST /api/v1/subjects
 * @access  Private/Admin
 */
exports.createSubject = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible, specializationId } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    const specialization = await Specialization.findByPk(specializationId);
    if (!specialization)
        return next(new ErrorResponse('Provided specialization does not exist.', 400));

    if (specialization.isArchive)
        return next(new ErrorResponse('Provided specialization is archival.', 400));

    let subject = await Subject.findOne({
        where: {
            specializationId: {
                [Op.eq]: specialization.id
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

    if (subject) {
        return next(
            new ErrorResponse(`Subject with this name or short for specialization '${specialization.name}' already exists.`, 400)
        )
    }

    subject = await Subject.build({
        name,
        short,
        isVisible,
        specializationId: specialization.id
    });
    await subject.save();

    res.status(201).json({
        success: true,
        data: {
            subject
        }
    });
});