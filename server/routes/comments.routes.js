const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createComment } = require('../controllers/comments/createComment');
const { getComments } = require('../controllers/comments/getComments');

router.post('/news/:id', protect, createComment);
router.get('/news/:id', getComments);

module.exports = router;
