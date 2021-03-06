const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const GeneralInfo = require('../../models/GeneralInfo');

/**
 * @desc    Delete University Link
 * @route   DELETE /api/v1/contact/university/links/:id
 * @access  Private/Admin
 */
exports.deleteUniversityLink = asyncHandler(async (req, res, next) => {
    let contact = await GeneralInfo.findOne();

    if (contact.university && contact.university.universityLinks)
        contact.university.universityLinks = contact.university.universityLinks.filter(l => l.id !== req.params.id);

    await contact.save();

    res.status(200).json({
        success: true,
        data: {
            contact
        }
    })
});
