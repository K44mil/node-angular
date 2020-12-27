const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Contact = require('../../models/Contact');

/**
 * @desc    Add Contact Link
 * @route   POST /api/v1/contact/links
 * @access  Private/Admin
 */
exports.addContactLink = asyncHandler(async (req, res, next) => {
    const { caption, href } = req.body;

    if (!caption || !href) {
        return next(
            new ErrorResponse('Caption and href are required.', 400)
        )
    }

    let contact = await Contact.findOne();

    if (!contact) {
        contact = await Contact.create({});
        const link = {
            caption: caption,
            href: href
        };
        contact.contactLinks.push(link);
        await contact.save();
    } else {
        const link = {
            caption: caption,
            href: href
        };
        contact.contactLinks.push(link);
        await contact.save();
    }

    res.status(200).json({
        success: true,
        data: {
            contact
        }
    })
});
