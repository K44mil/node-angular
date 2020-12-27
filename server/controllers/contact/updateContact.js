const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Contact = require('../../models/Contact');

/**
 * @desc    Update Contact Info
 * @route   PUT /api/v1/contact
 * @access  Private/Admin
 */
exports.updateContact = asyncHandler(async (req, res, next) => {
    const {
        country,
        city,
        street,
        postalCode,
        room,
        email,
        phone,
        webPage,
        consultations,
        shortInformation
    } = req.body;
    let contact = await Contact.findOne();

    if (!contact) {
        contact = await Contact.create({
            country,
            city,
            street,
            postalCode,
            room,
            email,
            phone,
            webPage,
            consultations,
            shortInformation
        });
    } else {
        contact = await Contact.findByIdAndUpdate(contact._id, req.body, {
            new: true,
            runValidators: true
        });
    }

    res.status(200).json({
        success: true,
        data: {
            contact
        }
    })
});
