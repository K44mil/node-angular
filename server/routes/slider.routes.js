const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { addSliderImage } = require('../controllers/slider/addSliderImage');
const { getSlider } = require('../controllers/slider/getSlider');
const { deleteSliderImage } = require('../controllers/slider/deleteSliderImage');
const { getSliderImages } = require('../controllers/slider/getSliderImages');
const { updateSliderImage } = require('../controllers/slider/updateSliderImage');
const { getSliderImageById } = require('../controllers/slider/getSliderImageById');

router.get('/visible', getSlider);

router.get('/:id', protect, authorize(Role.Admin), getSliderImageById);

router.get('/', protect, authorize(Role.Admin), getSliderImages);

router.post('/', protect, authorize(Role.Admin), addSliderImage);

router.delete('/:id', protect, authorize(Role.Admin), deleteSliderImage);

router.put('/:id', protect, authorize(Role.Admin), updateSliderImage);

module.exports = router;