const express = require('express');
const { deleteFile } = require('../controllers/files/deleteFile');
const router = express.Router();
const { downloadFile } = require('../controllers/files/downloadFile');
const { getFiles } = require('../controllers/files/getFiles');
const { uploadFile } = require('../controllers/files/uploadFile');
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');

router.get('/download/:id', downloadFile);
router.get('/', protect, authorize(Role.Admin), getFiles);

router.delete('/:id', protect, authorize(Role.Admin), deleteFile);

router.post('/upload', protect, authorize(Role.Admin), uploadFile);

module.exports = router;
