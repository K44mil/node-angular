const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createGroup } = require('../controllers/groups/createGroup');
const { getActiveGroups } = require('../controllers/groups/getGroups');
const { getGroup } = require('../controllers/groups/getGroup');
const { deleteGroup } = require('../controllers/groups/deleteGroup');
const { getOpenGroups } = require('../controllers/groups/getOpenGroups');
const { getGroupAdditionRequests } = require('../controllers/groups/getGroupAdditionRequest');
const { acceptAdditionRequest } = require('../controllers/groups/acceptAdditionRequest');
const { getGroupAttendance } = require('../controllers/groups/getGroupAttendance');
const { getMyGroups } = require('../controllers/groups/getMyGroups');
const { getMyGroupDetails } = require('../controllers/groups/getMyGroupDetails');

router.get('/open', getOpenGroups);
router.get('/my_groups/:id/details', protect, getMyGroupDetails);
router.get('/my_groups', protect, getMyGroups);


// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

router.post('/', createGroup);
router.get('/active', getActiveGroups);

router.get('/request/:id/accept', acceptAdditionRequest);
router.get('/:id/requests', getGroupAdditionRequests);
router.get('/:id/attendance', getGroupAttendance);
router.get('/:id', getGroup);

router.delete('/:id', deleteGroup);

module.exports = router;