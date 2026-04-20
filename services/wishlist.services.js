const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');
const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');

const addProductToWishlist = asyncHandler(async (req, res, next) => {
  const { product } = req.body;
  if (!product) {
    return next(new AppError('Product is not found', 404));
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: product }
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: user.wishlist
  });
});

const removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const { product } = req.params;
  if (!product) {
    return next(new AppError('product is required', 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: product }
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: user.wishlist
  });
});

const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const { wishlist } = await User.findById(req.user._id).select('wishlist');

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: wishlist
  });
});

module.exports = {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist
};
