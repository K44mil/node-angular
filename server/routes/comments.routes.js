const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createComment } = require('../controllers/comments/createComment');
const { getComments } = require('../controllers/comments/getComments');
const { deleteComment } = require('../controllers/comments/deleteComment');

router.post('/news/:id', protect, createComment);
router.get('/news/:id', getComments);
router.delete('/:id', protect, deleteComment);

module.exports = router;
