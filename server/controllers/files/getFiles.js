const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const File = require('../../models/File');
const { Op } = require('sequelize');

/**
 * @desc    Get Files
 * @route   GET /api/v1/files
 * @access  Private/Admin
 */
exports.getFiles = asyncHandler(async (req, res, next) => {
    let options = {
        where: { },
        order: [],
    };
    const { name } = req.query;
    
    // SELECT

    // Where
    if (name) options.where.name = { [Op.like]: `%${name}%`};

    // Order
    if (req.query.sort) {
        const order = req.query.sort.split(',');
        if (!order.includes('ASC') && !order.includes('DESC')) order[1] = 'ASC';
        options.order.push(order);
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    options.offset = startIndex;
    options.limit = limit;

    const files = await File.findAndCountAll(options);

    // Pagination results
    const pagination = { };

    if (endIndex < files.count) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    // Count pages
    const countPages = Math.ceil(files.count / limit);

    res.status(200).json({
        success: true,
        data: {
            count: files.count,
            countPages: countPages,
            pagination,
            files: files.rows
        }
    });
});