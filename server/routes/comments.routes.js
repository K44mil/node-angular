const express = require('express');
const router = express.Router();
const { createComment } = require('../controllers/comments/createComment');
const { getComments } = require('../controllers/comments/getComments');

router.post('/news/:id', createComment);
router.get('/news/:id', getComments);

module.exports = router;
