const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const University = require('../../models/University');

/**
 * @desc    Create University
 * @route   POST /api/v1/universities
 * @access  Private/Admin
 */
exports.createUniversity = asyncHandler(async (req, res, next) => {
    const { name, short, isVisible } = req.body;

    if (!name || !short) {
        return next(
            new ErrorResponse(`Fields name and short are required.`, 400)
        );
    }

    console.log(req.body);

    const university = await University.build({
        name,
        short: short,
        isVisible
    });
    await university.save();

    res.status(201).json({
        success: true,
        data: {
            university
        }
    })
});