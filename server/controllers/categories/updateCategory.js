const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Category = require('../../models/Category');
const { Op } = require('sequelize');

/**
 * @desc    Update Category
 * @route   PUT /api/v1/categories/:id
 * @access  Private/Admin
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    let category = await Category.findByPk(req.params.id);

    if (!category) {
        return next(
            new ErrorResponse(`Category does not exist.`, 400)
        );
    }

    if (!name) {
        return next(
            new ErrorResponse(`Category name is required.`, 400)
        );
    }

    let categoryExists = await Category.findOne({
        where: {
            name: {
                [Op.like]: name
            }
        }
    });

    if (categoryExists && categoryExists.id != category.id) {
        return next(
            new ErrorResponse(`Category '${name}' already exists.`, 400)
        );
    }

    category = await category.update({ name });

    res.status(200).json({
        success: true,
        data: {
            category
        }
    });
});