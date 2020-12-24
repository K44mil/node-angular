const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Increase Priority
 * @route   GET /api/v1/about/:id/increase_priority
 * @access  Private/Admin
 */
exports.increasePriority = asyncHandler(async (req, res, next) => {
    const page = await AboutPage.findById(req.params.id);
    if (!page) {
        return next(
            new ErrorResponse('About Page does not exist.', 400)
        )
    }

    if (page.priority - 1 > 0) {
        const nextPage = await AboutPage.findOne({ priority: page.priority - 1 });
        nextPage.priority += 1;
        page.priority -= 1;
        await page.save();
        await nextPage.save();
    }

    res.status(200).json({
        success: true,
        data: { }
    });
});