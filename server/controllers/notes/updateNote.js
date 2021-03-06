const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const StudentNote = require('../../models/StudentNote');
const { Op } = require('sequelize');

/**
 * @desc    Update Students Note
 * @route   PUT /api/v1/notes/:id
 * @access  Private/Admin
 */
exports.updateNote = asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    let studentNote = await StudentNote.findByPk(req.params.id);
    if (!studentNote) {
        return next(
            new ErrorResponse('Note does not exist.', 400)
        )
    }

    studentNote.text = text;
    await studentNote.save();

    res.status(201).json({
        success: true,
        data: {
            studentNote
        }
    });
});