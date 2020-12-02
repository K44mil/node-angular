const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const SliderImage = require('../../models/SliderImage');
const path = require('path');
const fs = require('fs');

/**
 * @desc    Delete Slider Image
 * @route   DELETE /api/v1/slider/:id
 * @access  Private/Admin
 */
exports.deleteSliderImage = asyncHandler(async (req, res, next) => {
    const sliderImage = await SliderImage.findById(req.params.id);

    if (!sliderImage) {
        return next(
            new ErrorResponse('Slider image does not exist.', 400)
        )
    }

    // DELETE FILE
    const filePath = path.join(path.resolve(__dirname, '../../public/uploads/slider/'), sliderImage.image);
    fs.unlink(filePath, () => {
        console.log(`File '${filePath}' has been deleted.`);
    });

    await sliderImage.remove();

    res.status(200).json({
        success: true,
        data: { }
    });
});