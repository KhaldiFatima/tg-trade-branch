const mongoose = require('mongoose');

const transactionsSchema = mongoose.Schema(
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
      // 'deposit', 'withdrawal'
    },
    Amount: {
      type: Number,
      required: [true, 'Please add a amount'],
    },

    PaymentMethod: {
      type: String,
      required: [true, 'Please add a Payment Method'],
      // paypal , payeer , perfect money
    },
    Status: {
      type: String,
      required: true,
      default: 'processing',
      // 'processing', 'Accepted', 'Rejected'
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('transaction', transactionsSchema);
module.exports = Transaction;

// lastMessage ? moment(lastMessage.date).format('hh:mm a') : '';
