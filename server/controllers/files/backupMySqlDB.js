const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const mysqldump = require('mysqldump');

/**
 * @desc    Download mysql db file
 * @route   GET /api/v1/files/backup/mysql
 * @access  Private/Admin
 */
exports.backupMySqlDB = asyncHandler(async (req, res, next) => {
    await mysqldump({
        connection: {
            host: `${process.env.MYSQL_HOST}`,
            user: `${process.env.MYSQL_USER}`,
            password: `${process.env.MYSQL_PASSWORD}`,
            database: `${process.env.MYSQL_DB_NAME}`
        },
        dumpToFile: './dump.sql'
    });

    res.download('./dump.sql');
});