const express = require('express');
const {
  getSettings,
  updateSettings,
} = require('../controller/controllerSettings');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/get-settings', getSettings);
router.patch('/update-settings', protect, adminOnly, updateSettings);

module.exports = router;
