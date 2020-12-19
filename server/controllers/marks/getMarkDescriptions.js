const asyncHandler = require('../../middleware/asyncHandler');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Get all Mark Description
 * @route   GET /api/v1/marks/descriptions
 * @access  Private/Admin
 */
exports.getMarkDescriptions = asyncHandler(async (req, res, next) => {
    const markDescriptions = await MarkDescription.findAll();

    res.status(200).json({
        success: true,
        data: { markDescriptions }
    });
});