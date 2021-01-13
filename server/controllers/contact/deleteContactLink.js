const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const GeneralInfo = require('../../models/GeneralInfo');

/**
 * @desc    Delete Contact Link
 * @route   DELETE /api/v1/contact/links/:id
 * @access  Private/Admin
 */
exports.deleteContactLink = asyncHandler(async (req, res, next) => {
    let contact = await GeneralInfo.findOne();

    if (contact.contactLinks)
        contact.contactLinks = contact.contactLinks.filter(l => l.id !== req.params.id);

    await contact.save();

    res.status(200).json({
        success: true,
        data: {
            contact
        }
    })
});
