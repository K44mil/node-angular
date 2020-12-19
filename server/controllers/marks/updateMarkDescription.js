const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const { Op } = require('sequelize');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Update Mark Description
 * @route   PUT /api/v1/marks/descriptions/:id
 * @access  Private/Admin
 */
exports.updateMarkDescription = asyncHandler(async (req, res, next) => {
    const { text } = req.body;

    let markDesc = await MarkDescription.findByPk(req.params.id);
    if (!markDesc) {
        return next(
            new ErrorResponse('Mark description does not exist.', 400)
        )
    }

    let existingMarkDesc = await MarkDescription.findOne({
        where: {
            text: {
                [Op.like]: text
            }
        }
    });

    if (existingMarkDesc && existingMarkDesc.id !== markDesc.id) {
        return next(
            new ErrorResponse('Such a Mark Description already exist.', 400)
        )
    }

    markDesc.text = text;
    await markDesc.save();

    res.status(200).json({
        success: true,
        data: {
            markDesc
        }
    });
});