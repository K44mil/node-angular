const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const AboutPage = require('../../models/AboutPage');

/**
 * @desc    Decrease Priority
 * @route   GET /api/v1/about/:id/decrease_priority
 * @access  Private/Admin
 */
exports.decreasePriority = asyncHandler(async (req, res, next) => {
    const page = await AboutPage.findById(req.params.id);
    if (!page) {
        return next(
            new ErrorResponse('About Page does not exist.', 400)
        )
    }

    const count = await AboutPage.count();

    if (page.priority + 1 <= count) {
        const nextPage = await AboutPage.findOne({ priority: page.priority + 1 });
        nextPage.priority -= 1;
        page.priority += 1;
        await page.save();
        await nextPage.save();
    }

    res.status(200).json({
        success: true,
        data: { }
    });
});