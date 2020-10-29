const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Contact = require('../../models/Contact');

/**
 * @desc    Get Contact Info
 * @route   GET /api/v1/contact
 * @access  Public
 */
exports.getContact = asyncHandler(async (req, res, next) => {
    let contact = await Contact.findOne();

    res.status(200).json({
        success: true,
        data: {
            contact
        }
    })
});