const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const GeneralInfo = require('../../models/GeneralInfo');

/**
 * @desc    Update Terms
 * @route   PUT /api/v1/terms
 * @access  Private/Admin
 */
exports.updateTerms = asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    let general = await GeneralInfo.findOne();

    if (!general) {
        general = await GeneralInfo.create({
            termsText: text
        });
    } else {
        general = await GeneralInfo.findByIdAndUpdate(general._id, { termsText: text }, {
            new: true,
            runValidators: true
        });
    }

    res.status(200).json({
        success: true,
        data: {
            general
        }
    })
});
