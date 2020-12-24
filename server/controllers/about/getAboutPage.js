const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Get About Page
 * @route   GET /api/v1/about/:id
 * @access  Private/Admin
 */
exports.getAboutPage = asyncHandler(async (req, res, next) => {
    const page = await AboutPage.findById(req.params.id);
    if (!page) {
        return next(
            new ErrorResponse('About Page does not exist.', 400)
        )
    }

    res.status(200).json({
        success: true,
        data: {
            page
        }
    });
});