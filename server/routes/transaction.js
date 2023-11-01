const express = require('express');
const {
  requestDepositFunds,
  requestWithdrawFunds,
  upgradeTransaction,
  allTransactions,
  allTransactionsUser,
  deleteTransaction,
  transactionStatus,
  updateTransaction,
} = require('../controller/transactionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  userOnly,
  AdminUserOnly,
} = require('../middleware/transactionMiddleware');
const router = express.Router();

router.post('/request-deposit-funds', protect, requestDepositFunds);
router.post('/request-withdraw-funds', protect, requestWithdrawFunds);
router.post('/upgrade-transaction', protect, adminOnly, upgradeTransaction);
router.get('/all-transaction', protect, adminOnly, allTransactions);
router.get('/all-transaction-user', protect, allTransactionsUser);

router.delete('/delete-transaction/:id', protect, userOnly, deleteTransaction);
router.get(
  '/transaction-status/:id',
  protect,
  AdminUserOnly,
  transactionStatus
);
router.patch('/update-transaction/:id', protect, updateTransaction);

module.exports = router;
