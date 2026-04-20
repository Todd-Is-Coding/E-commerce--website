const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    rating: {
      type: Number,
      min: [1, 'min rating is 1'],
      max: [5, 'max rating is 5 '],
      required: [true, 'ratings is required']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user']
    },
    // parent refrence 1 to Many
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'review must belong to a user']
    }
  },
  { timestamps: true }
);

// Compound unique index: one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        numOfReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      ratingAverage: stats[0].avgRating,
      ratingQuantity: stats[0].numOfReviews
    });
  } else {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingQuantity: 0
    });
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post('remove', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

const reviewModel = mongoose.model('Review', reviewSchema);

module.exports = reviewModel;
