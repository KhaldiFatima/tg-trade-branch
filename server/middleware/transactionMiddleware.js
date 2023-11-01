const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transaction');
const User = require('../models/user');

const userOnly = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  const user = await User.findById(transaction.userId);

  if (req.user.id === user.id) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an user');
  }
});
const AdminUserOnly = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  const user = await User.findById(transaction.userId);
  if (req.user.role === 'admin' || req.user.id === user.id) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an user');
  }
});

module.exports = { userOnly, AdminUserOnly };
