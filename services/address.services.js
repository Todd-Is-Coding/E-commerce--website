const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');
const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');

const addAddressToAddresses = asyncHandler(async (req, res, next) => {
  const { details, phone, alias, postalCode, city } = req.body;
  if (!details || !phone || !city) {
    return next(new AppError('Missing required address fields', 400));
  }

  const address = { details, phone, alias, postalCode, city };
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: address }
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: user.addresses
  });
});

const removeAddressFromAddresses = asyncHandler(async (req, res, next) => {
  const { address } = req.params;
  if (!address) {
    return next(new AppError('address is required', 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: address } }
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: user.addresses
  });
});

const getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const { addresses } = await User.findById(req.user._id).select('addresses');

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: addresses
  });
});

module.exports = {
  addAddressToAddresses,
  removeAddressFromAddresses,
  getLoggedUserAddresses
};
