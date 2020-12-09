const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Category = require('../../models/Category');

/**
 * @desc    Get Category
 * @route   GET /api/v1/categories/:id
 * @access  Private/Admin
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
        return next(
            new ErrorResponse(`Category does not exist.`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: {
            category
        }
    });
});