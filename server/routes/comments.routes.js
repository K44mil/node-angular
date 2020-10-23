const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createComment } = require('../controllers/comments/createComment');
const { getComments } = require('../controllers/comments/getComments');

// PROTECT FOR LOGGED USERS
router.use(protect);

router.post('/news/:id', protect, createComment);
router.get('/news/:id', protect, getComments);

module.exports = router;
