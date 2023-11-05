const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Amount = require('../models/amount');

const requestDepositFunds = asyncHandler(async (req, res) => {
  const { type, amountTrans, paymentMethod } = req.body;
  const userId = req.user._id;
  try {
    if (!type || !amountTrans || !paymentMethod) {
      res.status(400);
      throw new Error('Please fill in all the required fields.');
    }

    if (amountTrans.match(/[^0-9]/g)) {
      throw new Error('Please entre valid amount');
    }

    const transaction = await Transaction.create({
      userId,
      type,
      amountTrans,
      paymentMethod,
    });
    if (transaction) {
      const { _id, userId, type, amountTrans, paymentMethod, status, date } =
        transaction;

      res.status(201).json({
        _id,
        userId,
        type,
        amountTrans,
        paymentMethod,
        status,
        date,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid transaction data');
  }
});

const requestWithdrawFunds = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const amountUser = await Amount.findOne({ userId: req.user._id });

  const userId = user.id;
  const { type, amountTrans, paymentMethod } = req.body;
  try {
    if (!type || !amountTrans || !paymentMethod) {
      res.status(400);
      throw new Error('Please fill in all the required fields.');
    }

    if (amountTrans.match(/[^0-9]/g)) {
      throw new Error('Please entre valid amount');
    }
    if (amountTrans > amountUser.amount) {
      res.status(400);
      throw new Error(`You don't have enough money to pull it.`);
    }

    const transaction = await Transaction.create({
      userId,
      type,
      amountTrans,
      paymentMethod,
    });
    if (transaction) {
      const { _id, userId, type, amountTrans, paymentMethod, status, date } =
        transaction;

      res.status(201).json({
        _id,
        userId,
        type,
        amountTrans,
        paymentMethod,
        status,
        date,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid transaction data');
  }
});

const upgradeTransaction = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction Not Found. ');
  }
  if (transaction.status === 'Accepted' || transaction.status === 'Rejected') {
    res.status(404);
    throw new Error('The transaction status has already been updated');
  }
  transaction.status = status;
  await transaction.save();
  res.status(200).json({ message: `Transaction status updated to ${status}` });
});

const allTransactions = asyncHandler(async (req, res) => {
  // const users = await User.find().sort('-createdAt').select('-password');
  const transactions = await Transaction.find().sort('-createdAt');
  if (!transactions) {
    res.status(500);
    throw new Error('Something went wrong');
  }

  res.status(200).json(transactions);
});

const allTransactionsUser = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id }).sort(
    '-createdAt'
  );
  if (!transactions) {
    res.status(500);
    throw new Error('Something went wrong');
  }

  res.status(200).json(transactions);
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    res.status(404);
    throw new Error('Transaction Not Found. ');
  }

  if (transaction.status !== 'pending') {
    res.status(404);
    throw new Error(`You can't delete a transaction that has been.`);
  }

  await Transaction.findByIdAndDelete(id);
  res.status(200).json({
    message: 'transaction deleted successfully',
  });
});

const transactionStatus = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    res.status(404);
    throw new Error('Transaction Not Found. ');
  }
  if (transaction.status === 'accept' || transaction.status === 'reject') {
    return res.json(true);
  }
  return res.json(false);
});

const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    res.status(404);
    throw new Error('Transaction Not Found. ');
  }

  if (transaction.status !== 'pending') {
    res.status(404);
    throw new Error(`You can't edit a transaction that has been.`);
  }

  const { type, amountTrans, paymentMethod } = transaction;

  transaction.type = req.body.type || type;
  transaction.amountTrans = req.body.amountTrans || amountTrans;
  transaction.paymentMethod = req.body.paymentMethod || paymentMethod;

  const updatedTransaction = await transaction.save();
  res.status(201).json({
    type: updatedTransaction.type,
    amountTrans: updatedTransaction.amountTrans,
    paymentMethod: updatedTransaction.paymentMethod,
  });
});

const allTransactionsPending = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find().sort('-createdAt');
  if (!transactions) {
    res.status(500);
    throw new Error('Something went wrong');
  }
  const transactionsPending = transactions.filter((transaction) => {
    return transaction.status === 'pending';
  });

  res.status(200).json(transactionsPending);
});

const allTransactionsCompleted = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find().sort('-createdAt');
  if (!transactions) {
    res.status(500);
    throw new Error('Something went wrong');
  }
  const transactionsCompleted = transactions.filter((transaction) => {
    return transaction.status !== 'pending';
  });

  res.status(200).json(transactionsCompleted);
});

const deleteTransactionsUser = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.id });
  if (!transactions) {
    res.status(500);
    throw new Error('Something went wrong');
  }

  await Transaction.deleteMany({ userId: req.params.id });

  res.status(200).json({
    message: 'User transactions were successfully deleted',
  });
});

const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    res.status(404);
    throw new Error('Transaction Not Found. ');
  }

  res.status(200).json(transaction);
});

// const   deleteTransactionsUser=asyncHandler(async(req,res)=>{res.send("successfully")})

module.exports = {
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
};
