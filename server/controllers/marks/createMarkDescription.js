const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Create Mark Description
 * @route   POST /api/v1/marks/descriptions
 * @access  Private/Admin
 */
exports.createMarkDescription = asyncHandler(async (req, res, next) => {
    const { text } = req.body;

    let markDesc = await MarkDescription.findOne({
        where: {
            text: {
                [Op.like]: text
            }
        }
    });

    if (markDesc) {
        return next(
            new ErrorResponse('Such a Mark Description already exist.', 400)
        )
    }

    markDesc = await MarkDescription.create({
        text
    });

    res.status(200).json({
        success: true,
        data: {
            markDesc
        }
    });
});