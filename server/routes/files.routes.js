const express = require('express');
const router = express.Router();
const { downloadFile } = require('../controllers/files/downloadFile');

router.get('/download/:id', downloadFile);

module.exports = router;
