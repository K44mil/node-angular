const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createCategory } = require('../controllers/categories/createCategory');
const { updateCategory } = require('../controllers/categories/updateCategory');
const { getCategories } = require('../controllers/categories/getCategories');
const { deleteCategory } = require('../controllers/categories/deleteCategory');
const { getCategory } = require('../controllers/categories/getCategory');

router.get('/', getCategories);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// GET
router.get('/:id', getCategory);

// POST 
router.post('/', createCategory);

// PUT
router.put('/:id', updateCategory);

// DELETE
router.delete('/:id', deleteCategory);

module.exports = router;

