const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requried: [true, 'coupon must have a name'],
      unique: true
    },
    expire: {
      type: Date,
      required: [true, 'Coupon must have an expiration time']
    },
    discount: {
      type: Number,
      requried: [true, 'Coupon must have a discount']
    }
  },
  { timestamps: true }
);

const couponModel = mongoose.model('Coupon', couponSchema);

module.exports = couponModel;
