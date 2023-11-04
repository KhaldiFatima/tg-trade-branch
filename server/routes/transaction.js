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
  allTransactionsPending,
  allTransactionsCompleted,
  deleteTransactionsUser,
  getTransaction,
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
router.get(
  '/all-transaction-pending',
  protect,
  adminOnly,
  allTransactionsPending
);
router.get(
  '/all-transaction-completed',
  protect,
  adminOnly,
  allTransactionsCompleted
);

router.delete(
  '/delete-transaction-user/:id',
  protect,
  adminOnly,
  deleteTransactionsUser
);
router.get('/get-transaction/:id', protect, getTransaction);

module.exports = router;
