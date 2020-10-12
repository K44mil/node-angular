const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const BiographyPage = require('../../models/about/BiographyPage');

/**
 * @desc    Get Biography Page
 * @route   GET /api/v1/about/biography
 * @access  Public
 */
exports.getBiographyPage = asyncHandler(async (req, res, next) => {
    let biographyPage = await BiographyPage.findOne();

    if (!biographyPage) {
        biographyPage = await BiographyPage.create({
            text
        });
    }

    res.status(200).json({
        success: true,
        data: {
            biographyPage
        }
    });
});
