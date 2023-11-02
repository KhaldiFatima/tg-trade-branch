const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { updateAmount, getAmount } = require('../controller/amountController');
const router = express.Router();

router.get('/amount', protect, getAmount);
router.patch('/update-amount', protect, updateAmount);

module.exports = router;
