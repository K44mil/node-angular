const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createNews } = require('../controllers/news/createNews');
const { getNewsBySlug } = require('../controllers/news/getNewsBySlug');
const { getNews } = require('../controllers/news/getNews');

// GET
router.get('/:slug', getNewsBySlug);
router.get('/', getNews);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// POST
router.post('/', createNews);

module.exports = router;