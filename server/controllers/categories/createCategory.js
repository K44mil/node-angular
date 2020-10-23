const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Category = require('../../models/Category');
const { Op } = require('sequelize');

/**
 * @desc    Create Category
 * @route   POST /api/v1/categories
 * @access  Private/Admin
 */
exports.createCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(
            new ErrorResponse(`Category name is required.`, 400)
        );
    }

    let category = await Category.findOne({
        where: {
            name: {
                [Op.like]: name
            }
        }
    });

    if (category) {
        return next(
            new ErrorResponse(`Category '${name}' already exists.`, 400)
        );
    }

    category = await Category.create({ name });

    res.status(201).json({
        success: true,
        data: {
            category
        }
    });
});