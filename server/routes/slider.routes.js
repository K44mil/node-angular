const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { addSliderImage } = require('../controllers/slider/addSliderImage');
const { getSlider } = require('../controllers/slider/getSlider');
const { deleteSliderImage } = require('../controllers/slider/deleteSliderImage');
const { getSliderImages } = require('../controllers/slider/getSliderImages');

router.get('/visible', getSlider);

router.get('/', protect, authorize(Role.Admin), getSliderImages);

router.post('/', protect, authorize(Role.Admin), addSliderImage);

router.delete('/:id', protect, authorize(Role.Admin), deleteSliderImage);

module.exports = router;