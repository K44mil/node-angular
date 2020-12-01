const express = require('express');
const { deleteFile } = require('../controllers/files/deleteFile');
const router = express.Router();
const { downloadFile } = require('../controllers/files/downloadFile');
const { getFiles } = require('../controllers/files/getFiles');
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');

router.get('/download/:id', downloadFile);
router.get('/', protect, authorize(Role.Admin), getFiles);

router.delete('/:id', protect, authorize(Role.Admin), deleteFile);

module.exports = router;
