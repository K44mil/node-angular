const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');

/**
 * @desc    Restore Subject
 * @route   GET /api/v1/subjects/:id/restore
 * @access  Private/Admin
 */
exports.restoreSubject = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findByPk(req.params.id);

    if (!subject) {
        return next(
            new ErrorResponse(`Cannot find Subject with ID '${req.params.id}'.`, 400)
        );
    }

    subject.isArchive = false;
    await subject.save();

    res.status(200).json({
        success: true,
        data: {
            subject
        }
    });
});