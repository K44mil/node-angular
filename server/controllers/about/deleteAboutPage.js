const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Delete About Pages
 * @route   DELETE /api/v1/about/:id
 * @access  Private/Admin
 */
exports.deleteAboutPage = asyncHandler(async (req, res, next) => {
    const page = await AboutPage.findById(req.params.id);
    if (!page) {
        return next(
            new ErrorResponse('About page does not exist.', 400)
        )
    }

    await page.remove();

    res.status(200).json({
        success: true,
        data: { }
    });
});