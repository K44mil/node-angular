const express = require('express');
const router = express.Router();
const { backupMySqlDB } = require('../controllers/files/backupMySqlDB');
const { deleteFile } = require('../controllers/files/deleteFile');
const { downloadFile } = require('../controllers/files/downloadFile');
const { getFiles } = require('../controllers/files/getFiles');
const { uploadFile } = require('../controllers/files/uploadFile');
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');

router.get('/download/:id', downloadFile);
router.get('/', protect, authorize(Role.Admin), getFiles);

router.delete('/:id', protect, authorize(Role.Admin), deleteFile);

router.post('/upload', protect, authorize(Role.Admin), uploadFile);

// BACKUPS
router.get('/backup/mysql', protect, authorize(Role.Admin), backupMySqlDB);

module.exports = router;
