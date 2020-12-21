const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const SliderImage = require('../../models/SliderImage');
const path = require('path');

/**
 * @desc    Update slider image
 * @route   PUT /api/v1/slider/:id
 * @access  Private/Admin
 */
exports.updateSliderImage = asyncHandler(async (req, res, next) => {
    const sliderImage = await SliderImage.findById(req.params.id);
    if (!sliderImage) {
        return next(
            new ErrorResponse('Slider image does not exist.', 400)
        )
    } 
    
    const { title, isVisible } = req.body;

    if (title) sliderImage.title = title;
    if (isVisible) sliderImage.isVisible = isVisible;

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

        file.name = `slider_${sliderImage.id}${path.parse(file.name).ext}`;

        file.mv(`./public/uploads/slider/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(new ErrorResponse(`File upload error`, 500));
            }
        });
        sliderImage.image = file.name;
    }

    await sliderImage.save();

    res.status(200).json({
        success: true,
        data: { }
    });
});