const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { createGroup } = require('../controllers/groups/createGroup');
const { getGroups } = require('../controllers/groups/getGroups');
const { getGroup } = require('../controllers/groups/getGroup');
const { deleteGroup } = require('../controllers/groups/deleteGroup');
const { getOpenGroups } = require('../controllers/groups/getOpenGroups');
const { getGroupAdditionRequests } = require('../controllers/groups/getGroupAdditionRequest');
const { acceptAdditionRequest } = require('../controllers/groups/acceptAdditionRequest');
const { getGroupAttendance } = require('../controllers/groups/getGroupAttendance');
const { getMyGroups } = require('../controllers/groups/getMyGroups');
const { getMyGroupDetails } = require('../controllers/groups/getMyGroupDetails');
const { openGroup } = require('../controllers/groups/openGroup');
const { closeGroup } = require('../controllers/groups/closeGroup');
const { archiveGroup } = require('../controllers/groups/archiveGroup');
const { restoreGroup } = require('../controllers/groups/restoreGroup');
const { rejectAdditionRequest } = require('../controllers/groups/rejectAdditionRequest');
const { getGroupMembers } = require('../controllers/groups/getGroupMembers');
const { removeUserFromGroup } = require('../controllers/groups/removeUserFromGroup');
const { updateGroup } = require('../controllers/groups/updateGroup');
const { openManyGroups } = require('../controllers/groups/openManyGroups');
const { closeManyGroups } = require('../controllers/groups/closeManyGroups');
const { addUsersToGroup } = require('../controllers/groups/addUsersToGroup');
const { getGroupMarks } = require('../controllers/groups/getGroupMarks');
const { archiveManyGroups } = require('../controllers/groups/archiveManyGroups');
const { deleteManyGroups } = require('../controllers/groups/deleteManyGroups');
const { restoreManyGroups } = require('../controllers/groups/restoreManyGroups');

router.get('/open', getOpenGroups);
router.get('/my_groups/:id/details', protect, getMyGroupDetails);
router.get('/my_groups', protect, getMyGroups);


// Protected routes/Admin
router.use(protect, authorize(Role.Admin));

router.post('/', createGroup);
router.get('/', getGroups);

router.get('/request/:id/accept', acceptAdditionRequest);
router.get('/request/:id/reject', rejectAdditionRequest);
router.get('/members/:id/remove', removeUserFromGroup);
router.get('/:id/requests', getGroupAdditionRequests);
router.get('/:id/attendance', getGroupAttendance);
router.get('/:id/members', getGroupMembers);
router.get('/:id/marks', getGroupMarks);
router.get('/:id/open', openGroup);
router.get('/:id/close', closeGroup);
router.get('/:id/archive', archiveGroup);
router.get('/:id/restore', restoreGroup);
router.get('/:id', getGroup);

router.delete('/:id', deleteGroup);

router.put('/:id', updateGroup);

// Mass actions
router.post('/open_many', openManyGroups);
router.post('/close_many', closeManyGroups);
router.post('/archive_many', archiveManyGroups);
router.post('/delete_many', deleteManyGroups);
router.post('/restore_many', restoreManyGroups);
router.post('/:id/add_members', addUsersToGroup);

module.exports = router;