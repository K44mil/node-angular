const asyncHandler = require('../../middleware/asyncHandler');
const SliderImage = require('../../models/SliderImage');
const ErrorResponse = require('../../utils/ErrorResponse');

/**
 * @desc    Get Slider Image By Id
 * @route   GET /api/v1/slider/:id
 * @access  Protect/Admin
 */
exports.getSliderImageById = asyncHandler(async (req, res, next) => {
    const sliderImage = await SliderImage.findById(req.params.id);
    if (!sliderImage) {
        return next(
            new ErrorResponse('Slider image does not exist.', 400)
        )
    }

    res.status(200).json({
        success: true,
        data: {
            sliderImage
        }
    });
});