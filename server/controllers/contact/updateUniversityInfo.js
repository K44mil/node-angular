const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const GeneralInfo = require('../../models/GeneralInfo');
const path = require('path');

/**
 * @desc    Update University Info
 * @route   PUT /api/v1/contact/university
 * @access  Private/Admin
 */
exports.updateUniversityInfo = asyncHandler(async (req, res, next) => {
    const {
        name,
        faculty,
        department,
        addressLine1,
        addressLine2
    } = req.body;

    let contact = await GeneralInfo.findOne();

    if (!contact) {
        contact = await GeneralInfo.create();
    }

    console.log('---------------------------------------------------');
    console.log(addressLine1);

    if (name)
        contact.university.name = name;
    if (faculty)
        contact.university.faculty = faculty;
    if (department)
        contact.university.department = department;
    if (addressLine1)
        contact.university.addressLine1 = addressLine1;
    if (addressLine2)
        contact.university.addressLine2 = addressLine2;

    if (req.files && req.files.photo) {
        const file = req.files.photo;

        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload an image file`, 400));
        }

        if (file.size > process.env.MAX_NEWS_PHOTO_UPLOAD) {
            return next(
                new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_NEWS_PHOTO_UPLOAD}`,
                400
                )
            );
        }

        file.name = `uni_${contact.id}${path.parse(file.name).ext}`;

        file.mv(`./public/uploads/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(new ErrorResponse(`File upload error`, 500));
            }
        });
        contact.university.image = file.name;
    }

    await contact.save();

    res.status(200).json({
        success: true,
        data: {
            contact
        }
    })
});
