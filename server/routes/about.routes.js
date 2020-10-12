const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { updateBiographyPage } = require('../controllers/about/updateBiographyPage'); 
const { getBiographyPage } = require('../controllers/about/getBiographyPage');

// GET
router.get('/biography', getBiographyPage);

// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

// PUT
router.put('/biography', updateBiographyPage);

module.exports = router;