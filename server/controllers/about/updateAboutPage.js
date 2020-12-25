const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Update about page
 * @route   PUT /api/v1/about/:id
 * @access  Private/Admin
 */
exports.updateAboutPage = asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;

    if (!title) {
        return next(
            new ErrorResponse('Title is required.', 400)
        )
    }

    if (title.length > 50) {
        return next(
            new ErrorResponse('Title cannot be longer than 50 characters.', 400)
        )
    }
    
    const page = await AboutPage.findById(req.params.id);
    if (!page) {
        return next(
            new ErrorResponse('About Page does not exist.', 400)
        )
    }

    const pageExists = await AboutPage.findOne({ title: title });
    if (pageExists && pageExists.id !== page.id) {
        return next(
            new ErrorResponse('About Page with this title already exists.', 400)
        )
    }

    page.title = title;
    page.content = content;
    await page.save();

    res.status(200).json({
        success: true,
        data: {
            page
        }
    });
});