const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Subject = require('../../models/Subject');

/**
 * @desc    Get Subject by ID
 * @route   GET /api/v1/subjects/:id
 * @access  Private/Admin
 */
exports.getSubject = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findByPk(req.params.id);

    if (!subject) {
        return next(
            new ErrorResponse(`Cannot find Subject with ID '${req.params.id}'.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            subject
        }
    });
});