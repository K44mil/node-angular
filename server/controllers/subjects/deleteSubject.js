const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');

/**
 * @desc    Delete Subject
 * @route   DELETE /api/v1/subjects/:id
 * @access  Private/Admin
 */
exports.deleteSubject = asyncHandler(async (req, res, next) => {
    let subject = await Subject.findByPk(req.params.id);

    if (!subject) {
        return next(
            new ErrorResponse(`Cannot find Subject with ID '${req.params.id}'.`, 400)
        );
    }
    await subject.destroy();

    res.status(200).json({
        success: true,
        data: { }
    });
});