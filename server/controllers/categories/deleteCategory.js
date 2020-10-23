const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Category = require('../../models/Category');

/**
 * @desc    Delete Category
 * @route   DELETE /api/v1/categories/:id
 * @access  Private/Admin
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    let category = await Category.findByPk(req.params.id);

    if (!category) {
        return next(
            new ErrorResponse(`Category with ID '${req.params.id}' does not exist.`, 400)
        );
    }
    await category.destroy();

    res.status(200).json({
        success: true,
        data: {
            message: 'Category deleted.'
        }
    });
});