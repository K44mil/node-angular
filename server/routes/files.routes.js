const express = require('express');
const router = express.Router();
const { downloadFile } = require('../controllers/files/downloadFile');
const { getFiles } = require('../controllers/files/getFiles');
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');

router.get('/download/:id', downloadFile);
router.get('/', protect, authorize(Role.Admin), getFiles);

module.exports = router;
