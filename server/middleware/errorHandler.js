const errorHandler = (err, req, res, next) => {

    // Sequelize Connection Refuse Error
    if (err.name === 'SequelizeConnectionRefusedError')
        err.message = 'Connection with db error.';

    // Log to console for dev
    console.log(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || `Internal Server Error.`
    });
};

module.exports = errorHandler;