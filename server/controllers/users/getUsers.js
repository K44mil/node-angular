const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const { Op, Sequelize } = require('sequelize');
const UserGroup = require('../../models/relationsModels/UserGroup');

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
    let options = {
        where: { },
        order: [],
        include: [],
        attributes: [
            'id', 'email', 'firstName', 'lastName', 'role', 'albumNumber', 'created_at', 'updated_at', 
        ]
    };
    const {
        email,
        role,
        isVerified,
        isBlocked,
        firstName,
        lastName,
        albumNumber,
        notInGroup,
        groupId
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
    // const total = await User.count();

    options.offset = startIndex;
    options.limit = limit;

    // check if user not in group
    if (notInGroup) {
        options.attributes.push([
            Sequelize.literal(`( SELECT groupId FROM user_group AS ug WHERE userId = User.id AND ug.is_confirmed = 1 AND ug.groupId = "${notInGroup}")`),
            'userGroup'
        ]);
    }

    // Get user in group
    if (groupId) {
        options.include.push({ model: UserGroup, where: { groupId: { [Op.eq]: groupId} }});
    }
        
    const users = await User.findAndCountAll(options);
    
    // Pagination results
    const pagination = {};

    if (endIndex < users.count) { // total) {
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
    const countPages = Math.ceil(users.count / limit);

    res.status(200).json({
        success: true,
        data: {
            count: users.count,
            countPages: countPages,
            pagination,
            users: users.rows
        }
    });
});