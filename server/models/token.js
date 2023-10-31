const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  verifyToken: {
    type: String,
    default: '',
  },

  resetPassToken: {
    type: String,
    default: '',
  },

  loginToken: {
    type: String,
    default: '',
  },

  createdAt: {
    type: Date,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
