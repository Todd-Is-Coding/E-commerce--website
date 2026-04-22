const express = require('express');

const {
  createCashOrder,
  filterOrderForLoggedUser,
  getSpecificOrder,
  getAllOrders,
  updateOrderPaidStatusToPaid
} = require('../services/order.services');

const {
  createCashOrderValidator,
  getSpecificOrderValidator,
  updateOrderPaidStatusValidator
} = require('../utils/validators/orderValidators');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router();

router.use(verifyToken);

router
  .route('/')
  .get(restrictedTo('admin', 'manager', 'user'), filterOrderForLoggedUser, getAllOrders)
  .post(restrictedTo('user'), createCashOrderValidator, createCashOrder);

router
  .route('/:id')
  .get(restrictedTo('admin', 'manager'), getSpecificOrderValidator, getSpecificOrder);

router
  .route('/:id/pay')
  .patch(
    restrictedTo('admin', 'manager'),
    updateOrderPaidStatusValidator,
    updateOrderPaidStatusToPaid
  );

module.exports = router;
