const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const GeneralInfo = require('../../models/GeneralInfo');

/**
 * @desc    Get Contact Info
 * @route   GET /api/v1/contact
 * @access  Public
 */
exports.getContact = asyncHandler(async (req, res, next) => {
    let contact = await GeneralInfo.findOne();

    res.status(200).json({
        success: true,
        data: {
            contact
        }
    })
});