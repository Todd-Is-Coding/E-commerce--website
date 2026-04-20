const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');
const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');

const addProductToWishlist = asyncHandler(async (req, res, next) => {
  const { product } = req.body;
  if (!product) {
    return next(new AppError('Product is required', 400));
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

module.exports = {
  addProductToWishlist
};
