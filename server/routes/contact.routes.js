const express = require('express');
const { getContact } = require('../controllers/contact/getContact');
const { updateContact } = require('../controllers/contact/updateContact');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');

router.put('/', protect, authorize(Role.Admin), updateContact);

router.get('/', getContact);

module.exports = router;
