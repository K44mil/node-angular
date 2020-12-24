const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const StudentNote = require('../../models/StudentNote');
const { Op } = require('sequelize');

/**
 * @desc    Delete Students Note
 * @route   DELETE /api/v1/notes/:id
 * @access  Private/Admin
 */
exports.deleteNote = asyncHandler(async (req, res, next) => {
    let studentNote = await StudentNote.findByPk(req.params.id);
    if (!studentNote) {
        return next(
            new ErrorResponse('Note does not exist.', 400)
        )
    }
    await studentNote.destroy();

    res.status(201).json({
        success: true,
        data: { }
    });
});