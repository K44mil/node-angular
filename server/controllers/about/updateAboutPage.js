const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Update about page
 * @route   PUT /api/v1/about/:id
 * @access  Private/Admin
 */
exports.updateAboutPage = asyncHandler(async (req, res, next) => {
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
    page.priority = priority;
    await page.save();

    res.status(200).json({
        success: true,
        data: {
            page
        }
    });
});