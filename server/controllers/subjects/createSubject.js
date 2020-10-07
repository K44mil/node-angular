const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');

/**
 * @desc    Create Subject
 * @route   POST /api/v1/subjects
 * @access  Private/Admin
 */
exports.createSubject = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    const subject = await Subject.build({
        name,
        short,
        isVisible
    });
    await subject.save();

    res.status(201).json({
        success: true,
        data: {
            subject
        }
    });
});