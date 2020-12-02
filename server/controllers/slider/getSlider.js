const asyncHandler = require('../../middleware/asyncHandler');
const SliderImage = require('../../models/SliderImage');

/**
 * @desc    Get Slider
 * @route   GET /api/v1/slider/visible
 * @access  Public
 */
exports.getSlider = asyncHandler(async (req, res, next) => {
    const slider = await SliderImage.find({ isVisible: true });

    res.status(200).json({
        success: true,
        data: {
            slider
        }
    });
});