const express = require('express');
const { addContactLink } = require('../controllers/contact/addContactLink');
const { addUniversityLink } = require('../controllers/contact/addUniversityLink');
const { deleteContactLink } = require('../controllers/contact/deleteContactLink');
const { deleteUniversityLink } = require('../controllers/contact/deleteUniversityLink');
const { getContact } = require('../controllers/contact/getContact');
const { updateContact } = require('../controllers/contact/updateContact');
const { updateTerms } = require('../controllers/contact/updateTerms');
const { updateUniversityInfo } = require('../controllers/contact/updateUniversityInfo');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Role = require('../models/Role');

router.put('/', protect, authorize(Role.Admin), updateContact);
router.put('/university', protect, authorize(Role.Admin), updateUniversityInfo);
router.put('/terms', protect, authorize(Role.Admin), updateTerms);

router.get('/', getContact);

router.post('/links', protect, authorize(Role.Admin), addContactLink);
router.delete('/links/:id', protect, authorize(Role.Admin), deleteContactLink);

router.post('/university/links', protect, authorize(Role.Admin), addUniversityLink);
router.delete('/university/links/:id', protect, authorize(Role.Admin), deleteUniversityLink);

module.exports = router;
