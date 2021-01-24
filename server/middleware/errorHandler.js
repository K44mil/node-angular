const errorHandler = (err, req, res, next) => {

    // Sequelize Connection Refuse Error
    if (err.name === 'SequelizeConnectionRefusedError')
        err.message = 'Connection with db error.';

    if (err.name === 'JsonWebTokenError') {
        res.cookie('token', '', { expires: new Date(Date.now() - 1000) });

        err.message = 'Invalid token.';
        err.statusCode = 401;
    }
        

    // Log to console for dev
    console.log(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || `Internal Server Error.`
    });
};

module.exports = errorHandler;