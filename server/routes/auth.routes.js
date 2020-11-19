const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const { protect, authorize } = require('../middleware/auth');
const { registerUser } = require('../controllers/auth/registerUser');
const { registerStudent } = require('../controllers/auth/registerStudent');
const { login } = require('../controllers/auth/login');
const { getMe } = require('../controllers/auth/getMe');
const { forgotPassword } = require('../controllers/auth/forgotPassword');
const { resetPassword } = require('../controllers/auth/resetPassword');
const { changePassword } = require('../controllers/auth/changePassword');
const { changeAvatar } = require('../controllers/auth/changeAvatar');
const { isAdmin } = require('../controllers/auth/isAdmin');

// POST
router.post('/register_user', registerUser);
router.post('/register_student', registerStudent);
router.post('/login', login);
router.post('/forgot_password', forgotPassword);

// GET
router.get('/me', protect, getMe);

// PUT
router.put('/change_password', protect, changePassword);
router.put('/reset_password/:resetToken', resetPassword);
router.put('/change_avatar', protect, changeAvatar);

// Check if user is admin
router.get('/admin', protect, authorize(Role.Admin), isAdmin);

module.exports = router;