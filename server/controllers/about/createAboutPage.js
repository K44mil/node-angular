const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Create new About Page
 * @route   POST /api/v1/about/
 * @access  Private/Admin
 */
exports.createAboutPage = asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    
    if (!title) {
        return next(
            new ErrorResponse('Title is required.', 400)
        )
    }

    let page = await AboutPage.findOne({
        title: title
    });

    if (page) {
        return next(
            new ErrorResponse('About Page with this title already exist.', 400)
        )
    }

    page = await AboutPage.create({
        title,
        content
    });
    
    res.status(200).json({
        success: true,
        data: { page }
    });
});