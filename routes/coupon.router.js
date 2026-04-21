const express = require('express');

const {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon
} = require('../services/coupon.services');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router();

router.use(verifyToken, restrictedTo('admin', 'manager'));

router.route('/').post(createCoupon).get(getAllCoupons);

router.route('/:id').get(getCouponById).patch(updateCoupon).delete(deleteCoupon);

module.exports = router;
