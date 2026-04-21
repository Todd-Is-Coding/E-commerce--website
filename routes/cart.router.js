const express = require('express');

const {
  addToCart,
  getLoggedUserCart,
  removeItemFromCart,
  clearCart,
  updateCartItemQuantity,
  applyCoupon
} = require('../services/cart.services');

const {
  addToCartValidator,
  removeItemFromCartValidator,
  updateCartItemQuantityValidator,
  applyCouponValidator
} = require('../utils/validators/cartValidators');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router();

router.use(verifyToken, restrictedTo('user'));

router.route('/').get(getLoggedUserCart).post(addToCartValidator, addToCart).delete(clearCart);

router.route('/:id').delete(removeItemFromCartValidator, removeItemFromCart);

router.route('/item/:itemId').patch(updateCartItemQuantityValidator, updateCartItemQuantity);

router.route('/coupon').post(applyCouponValidator, applyCoupon);

module.exports = router;
