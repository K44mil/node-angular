const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Category = require('../../models/Category');

/**
 * @desc    Get all Categories
 * @route   GET /api/v1/categories
 * @access  Private/Admin
 */
exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).json({
        success: true,
        data: {
            categories
        }
    });
});