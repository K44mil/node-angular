const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const GeneralInfo = require('../../models/GeneralInfo');

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
        shortInformation,
        secondInformation,
        calendar
    } = req.body;
    let contact = await GeneralInfo.findOne();

    if (!contact) {
        contact = await GeneralInfo.create({
            country,
            city,
            street,
            postalCode,
            room,
            email,
            phone,
            webPage,
            consultations,
            shortInformation,
            secondInformation,
            calendar
        });
    } else {
        contact = await GeneralInfo.findByIdAndUpdate(contact._id, req.body, {
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
