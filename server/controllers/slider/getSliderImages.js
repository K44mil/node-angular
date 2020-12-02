const asyncHandler = require('../../middleware/asyncHandler');
const SliderImage = require('../../models/SliderImage');

/**
 * @desc    Get Slider Images
 * @route   GET /api/v1/slider
 * @access  Private/Admin
 */
exports.getSliderImages = asyncHandler(async (req, res, next) => {
    const slider = await SliderImage.find();

    res.status(200).json({
        success: true,
        data: {
            slider
        }
    });
});