const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');

/**
 * @desc    Update Subject
 * @route   PUT /api/v1/subjects/:id
 * @access  Private/Admin
 */
exports.updateSubject = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;
    let subject = await Subject.findByPk(req.params.id);

    if (!subject) {
        return next(
            new ErrorResponse(`Cannot find Subject with ID '${req.params.id}'.`, 400)
        );
    }

    await subject.update({
        name,
        short,
        isVisible
    });

    res.status(200).json({
        success: true,
        data: {
            subject
        }
    });
});