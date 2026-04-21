const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Cart item must belong to a product']
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      default: 1
    },
    color: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Cart item must have a price'],
      min: [0, 'Price cannot be negative']
    }
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    cartItems: [cartItemSchema],
    totalCartPrice: {
      type: Number,
      default: 0,
      min: 0
    },
    priceAfterDiscount: {
      type: Number,
      min: 0
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a user'],
      unique: true // one cart per user, enforced at DB level
    }
  },
  { timestamps: true }
);

/*
    Observer Pattern (Parital Usage)
 */

// cartSchema.pre('save', function () {
//   this.totalCartPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
// });

cartSchema.post('save', async function (doc) {
  await doc.populate({
    path: 'cartItems.product',
    select: 'title price priceAfterDiscount imageCover description'
  });
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
