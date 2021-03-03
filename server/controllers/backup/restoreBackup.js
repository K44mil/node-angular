const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const fs = require('fs');
const { sequelize } = require('../../config/db');
const Backup = require('../../models/Backup');

/**
 * @desc    Restore Backup Data
 * @route   GET /api/v1/backup/restore
 * @access  Private/Admin
 */
exports.restoreBackup = asyncHandler(async (req, res, next) => {
    const backup = await Backup.findOne();
    if (!backup)
        return next(new ErrorResponse('Backup is not created.', 400));
    
    let sql;
   
    try {
        sql = fs.readFileSync('./dump.sql', 'utf8');
    } catch (err) {
        return next(new ErrorResponse('Cannot read a backup file.', 400));
    }

    await sequelize.drop();

    await sequelize.query(sql);

    res.status(200).json({
        success: true,
        data: { }
    });
});