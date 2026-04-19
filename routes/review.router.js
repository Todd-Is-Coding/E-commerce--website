const express = require('express');

const {
  getAllReviews,
  getReviewById,
  deleteReview,
  updateReview,
  createReview
} = require('../services/review.services');

const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator
} = require('../utils/validators/reviewValidators');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');
const createFilterObj = require('../middlewares/createFilterObj');

const router = express.Router({ mergeParams: true });

router.use(verifyToken);

router
  .route('/')
  .get(createFilterObj('productId', 'product'), getAllReviews)
  .post(restrictedTo('user'), createReviewValidator, createReview);

router
  .route('/:id')
  .get(getReviewValidator, getReviewById)
  .patch(restrictedTo('user'), updateReviewValidator, updateReview)
  .delete(restrictedTo('admin', 'manager', 'user'), deleteReviewValidator, deleteReview);

module.exports = router;
