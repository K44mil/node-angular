const express = require('express');
const { addContactLink } = require('../controllers/contact/addContactLink');
const { deleteContactLink } = require('../controllers/contact/deleteContactLink');
const { getContact } = require('../controllers/contact/getContact');
const { updateContact } = require('../controllers/contact/updateContact');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');

router.put('/', protect, authorize(Role.Admin), updateContact);

router.get('/', getContact);

router.post('/links', protect, authorize(Role.Admin), addContactLink);
router.delete('/links/:id', protect, authorize(Role.Admin), deleteContactLink);

module.exports = router;
