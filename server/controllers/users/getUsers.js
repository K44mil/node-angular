const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const { Op } = require('sequelize');

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
    let options = {
        where: { },
        order: [],
    };
    const {
        email,
        role,
        isVerified,
        isBlocked,
        firstName,
        lastName,
        albumNumber
    } = req.query;

    // SELECT

    // Where
    if (email) options.where.email = { [Op.like]: `%${email}%` };
    if (role) options.where.role = { [Op.in]: role.split(',') };
    if (isVerified) options.where.isVerified = { [Op.eq]: isVerified === 'true' ? 1 : isVerified === 'false' ? 0 : isVerified };
    if (isBlocked) options.where.isBlocked = { [Op.eq]: isBlocked === 'true' ? 1 : isBlocked === 'false' ? 0 : isBlocked };
    if (firstName) options.where.firstName = { [Op.like]: `%${firstName}%` };
    if (lastName) options.where.lastName = { [Op.like]: `%${lastName}%` };
    if (albumNumber) options.where.albumNumber = { [Op.like]: `%${albumNumber}%` };
    
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
    const total = await User.count();

    options.offset = startIndex;
    options.limit = limit;

    const users = await User.findAll(options);
    
    // Pagination results
    const pagination = {};

    if (endIndex < total) {
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

    res.status(200).json({
        success: true,
        data: {
            count: users.length,
            pagination,
            users
        }
    });
});