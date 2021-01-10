const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    // Token from Headers
    // const authHeader = req.headers.authorization;

    // if (authHeader && authHeader.startsWith('Bearer')) {
    //     token = authHeader.split(' ')[1];
    // }
    
    // Token from Cookies
    if (req.cookies.token)
        token = req.cookies.token;

    if (!token) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }

    if (!user.isVerified) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }

    if (user.isBlocked) {
        return next(
            new ErrorResponse('Not authorized.', 401)
        );
    }

    req.user = user;
    next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(`Not authorized.`, 401)
            );
        }
        next();
    }
};

// Check if user is logged in
exports.getLoggedUser = asyncHandler(async (req) => {
    let token;
    
    // Token from Headers 
    // const authHeader = req.headers.authorization;

    // if (authHeader && authHeader.startsWith('Bearer')) {
    //     token = authHeader.split(' ')[1];
    // }

    // Token from Cookies
    if (req.cookies.token)
        token = req.cookies.token;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return null;

    const user = await User.findByPk(decoded.id);
    if (!user) return null;

    return user;
});