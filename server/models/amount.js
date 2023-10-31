const mongoose = require('mongoose');

const amountSchema = mongoose.Schema(
  {
    transactionsId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'transaction',
    },
    Amount: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Amount = mongoose.model('amount', amountSchema);
module.exports = Amount;
