const asyncHandler = require('express-async-handler');
const Settings = require('../models/settings');
const User = require('../models/user');

const getSettings = asyncHandler(async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (settings.length === 0) {
      await Settings.create({
        isCreate: false,
        isAllowC: true,
        isAllowM: true,
        isDeposit: false,
        isWithdrawal: false,
      });
    }

    res.status(200).json({
      isCreate: settings.isCreate,
      isAllowC: settings.isAllowC,
      isAllowM: settings.isAllowM,
      isDeposit: settings.isDeposit,
      isWithdrawal: settings.isDeposit,
    });
  } catch (error) {
    res.status(404);
    throw new Error('Network error');
  }
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.findOne();
  if (settings) {
    const { isCreate, isAllowC, isAllowM, isDeposit, isWithdrawal } = req.body;

    settings.isCreate = isCreate;
    settings.isAllowC = isAllowC;
    settings.isAllowM = isAllowM;
    settings.isDeposit = isDeposit;
    settings.isWithdrawal = isWithdrawal;

    const updatedSettings = await settings.save();
    console.log(updatedSettings, '*');
    res.status(201).json({
      isCreate: updatedSettings.isCreate,
      isAllowC: updatedSettings.isAllowC,
      isAllowM: updatedSettings.isAllowM,
      isDeposit: updatedSettings.isDeposit,
      isWithdrawal: updatedSettings.isWithdrawal,
    });
  } else {
    res.status(404);
    throw new Error('Somethings wrong, Settings not found');
  }
});

// const loginWithCode=asyncHandler(async(req,res)=>{res.send("successfully")})

module.exports = { getSettings, updateSettings };
