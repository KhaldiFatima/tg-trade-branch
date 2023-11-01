const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },

    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      required: [true, 'Please add a   Transaction Type'],
      // 'deposit', 'withdraw'
    },
    amountTrans: {
      type: Number,
      required: [true, 'Please add a amount'],
    },

    paymentMethod: {
      type: String,
      required: [true, 'Please add a Payment Method'],
      // paypal , payeer , perfect money
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      // 'pending', 'Accepted', 'Rejected'
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('transaction', transactionSchema);
module.exports = Transaction;

// lastMessage ? moment(lastMessage.date).format('hh:mm a') : '';
