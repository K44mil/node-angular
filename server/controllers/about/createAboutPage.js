const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Create new About Page
 * @route   POST /api/v1/about/
 * @access  Private/Admin
 */
exports.createAboutPage = asyncHandler(async (req, res, next) => {
    const { title, priority, content } = req.body;
    
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

    if (!priority) {
        return next(
            new ErrorResponse('Priority is required.', 400)
        )
    }

    if (Number(priority) === NaN) {
        return next(
            new ErrorResponse('Priority has to be a number.', 400)
        )
    }

    if (Number(priority) < 0 || Number(priority) > 99) {
        return next(
            new ErrorResponse('Priority value has to be between 0 and 99.', 400)
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
        content,
        priority
    });
    
    res.status(200).json({
        success: true,
        data: { page }
    });
});