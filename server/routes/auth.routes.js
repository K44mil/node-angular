const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { registerUser } = require('../controllers/auth/registerUser');
const { login } = require('../controllers/auth/login');
const { getMe } = require('../controllers/auth/getMe');
const { forgotPassword } = require('../controllers/auth/forgotPassword');
const { resetPassword } = require('../controllers/auth/resetPassword');
const { changePassword } = require('../controllers/auth/changePassword');

// POST
router.post('/register_user', registerUser);
router.post('/login', login);
router.post('/forgot_password', forgotPassword);

// GET
router.get('/me', protect, getMe);

// PUT
router.put('/change_password', protect, changePassword);
router.put('/reset_password/:resetToken', resetPassword);

module.exports = router;