const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Amount = require('../models/amount');

const getAmount = asyncHandler(async (req, res) => {
  const amountUser = await Amount.findOne({ userId: req.user._id });
  if (amountUser) {
    const { userId, amount } = amountUser;
    res.status(200).json({
      userId,
      amount,
    });
  } else {
    res.status(404);
    throw new Error('Account Funds not found');
  }
});

const updateAmount = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const transaction = await Transaction.findById(id);
  const totalAmountUser = await Amount.findOne({ userId: transaction.userId });
  if (!totalAmountUser) {
    res.status(404);
    throw new Error('Account funds Not Found. ');
  }

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction Not Found. ');
  }

  const { amountTrans, type, status } = transaction;

  if (status === 'Accepted') {
    if (type === 'deposit') {
      totalAmountUser.amount += amountTrans;
    } else if (type === 'withdrawal') {
      totalAmountUser.amount -= amountTrans;
    }
  }

  console.log('updateAmount' + totalAmountUser);

  const updateAmount = await totalAmountUser.save();

  const { userId, amount } = updateAmount;
  res.status(200).json({
    userId,
    amount,
  });
});

// const getAmount=asyncHandler(async(req,res)=>{res.send("successfully")})

module.exports = { getAmount, updateAmount };
