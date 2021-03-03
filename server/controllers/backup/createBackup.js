const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Backup = require('../../models/Backup');
const mysqldump = require('mysqldump');
const File = require('../../models/File');

/**
 * @desc    Create Backup
 * @route   GET /api/v1/backup/create
 * @access  Private/Admin
 */
exports.createBackup = asyncHandler(async (req, res, next) => {
    let backup = await Backup.findOne();

    await mysqldump({
        connection: {
            host: `${process.env.MYSQL_HOST}`,
            user: `${process.env.MYSQL_USER}`,
            password: `${process.env.MYSQL_PASSWORD}`,
            database: `${process.env.MYSQL_DB_NAME}`
        },
        dumpToFile: './dump.sql'
    });

    const files = await File.findAll();
    const ids = [];
    for (const file of files) {
        ids.push(file.id);
    }
    
    if (backup) {
        backup.files = ids;
        backup.createdAt = Date.now();
        await backup.save();
    } else {
        backup = await Backup.create({
            files: ids
        });
    }

    res.status(200).json({
        success: true,
        data: {
            backup
        }
    });
});