const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const SliderImage = require('../../models/SliderImage');
const path = require('path');

/**
 * @desc    Add image to slider
 * @route   POST /api/v1/slider
 * @access  Private/Admin
 */
exports.addSliderImage = asyncHandler(async (req, res, next) => {
    const { caption, secondCaption, isVisible } = req.body;

    const sliderImage = await SliderImage.create({
        caption,
        secondCaption
    });

    if (req.files && req.files.photo) {
        const file = req.files.photo;

        if (!file.mimetype.startsWith('image')) {
            await sliderImage.remove();
            return next(new ErrorResponse(`Please upload an image file`, 400));
        }

        if (file.size > process.env.MAX_NEWS_PHOTO_UPLOAD) {
            await sliderImage.remove();
            return next(
              new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_NEWS_PHOTO_UPLOAD}`,
                400
              )
            );
        }

        file.name = `slider_${sliderImage.id}${path.parse(file.name).ext}`;

        file.mv(`./public/uploads/slider/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(new ErrorResponse(`File upload error`, 500));
            }
        });
        sliderImage.image = file.name;
    } else {
        await sliderImage.remove();
        return next(
            new ErrorResponse('Please upload an image file.', 400)
        )
    }

    await sliderImage.save();

    res.status(200).json({
        success: true,
        data: { }
    });
});