const express = require('express');
const router = express.Router();
const {
  protect,
  adminOnly,
  AdminUserOnly,
} = require('../middleware/authMiddleware');
const {
  login,
  register,
  logout,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  loginStatus,
  upgradeUser,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  sendLoginCode,
  loginWithCode,
  getUserWithId,
} = require('../controller/userController');

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.get('/get-user', protect, getUser);
router.patch('/update-user', protect, updateUser);

router.delete('/delete-user/:id', protect, AdminUserOnly, deleteUser);
router.get('/get-users', protect, adminOnly, getAllUsers);
router.get('/login-status', loginStatus);
router.post('/upgrade-user', protect, adminOnly, upgradeUser);
router.post('/send-automated-email', protect, sendAutomatedEmail);

router.post('/send-verification-email', protect, sendVerificationEmail);
router.patch('/verify-user/:verificationToken', verifyUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:resetToken', resetPassword);
router.post('/change-password', protect, changePassword);

router.post('/send-login-code/:email', sendLoginCode);
router.post('/login-with-code/:email', loginWithCode);
router.get('/get-user-with-id/:id', protect, adminOnly, getUserWithId);

module.exports = router;
