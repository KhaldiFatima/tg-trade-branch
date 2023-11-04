const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  isCreate: {
    type: Boolean,
    default: false,
  },
  isAllowC: {
    type: Boolean,
    default: true,
  },
  isAllowM: {
    type: Boolean,
    default: true,
  },
  isDeposit: {
    type: Boolean,
    default: false,
  },
  isWithdrawal: {
    type: Boolean,
    default: false,
  },
});

const Settings = mongoose.model('settings', settingsSchema);
module.exports = Settings;
