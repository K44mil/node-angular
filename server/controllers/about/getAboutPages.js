const asyncHandler = require('../../middleware/asyncHandler');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Get About Pages
 * @route   GET /api/v1/about
 * @access  Public
 */
exports.getAboutPages = asyncHandler(async (req, res, next) => {
    const pages = await AboutPage.find({}).sort({ priority: 1 });

    res.status(200).json({
        success: true,
        data: {
            pages
        }
    });
});