const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createNews } = require('../controllers/news/createNews');
const { getNewsBySlug } = require('../controllers/news/getNewsBySlug');
const { getNews } = require('../controllers/news/getNews');
const { getVisibleNews } = require('../controllers/news/getVisibleNews');
const { changeVisibility } = require('../controllers/news/changeVisibility');
const { changeCommentable } = require('../controllers/news/changeCommentable');
const { changeProtected } = require('../controllers/news/changeProtected');
const { deleteNews } = require('../controllers/news/deleteNews');
const { getNewsById } = require('../controllers/news/getNewsById');
const { updateNews } = require('../controllers/news/updateNews');

// GET

router.get('/:id/change_protected', protect, authorize(Role.Admin), changeProtected);
router.get('/:id/change_commentable', protect, authorize(Role.Admin), changeCommentable);
router.get('/:id/change_visibility', protect, authorize(Role.Admin), changeVisibility);
router.get('/id/:id', protect, authorize(Role.Admin), getNewsById);
router.get('/visible', getVisibleNews);
router.get('/:slug', getNewsBySlug);
router.get('/', getNews);


// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// POST
router.post('/', createNews);

// DELETE
router.delete('/:id', deleteNews);

// PUT
router.put('/:id', updateNews);


module.exports = router;