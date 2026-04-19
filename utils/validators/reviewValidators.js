const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validation');
const Review = require('../../models/review.model');

const createReviewValidator = [
  check('title').optional(),
  check('rating')
    .notEmpty()
    .withMessage('rating value required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Ratings value must be between 1 to 5'),

  validatorMiddleware
];

const getReviewValidator = [
  check('id').isMongoId().withMessage('Invalid Review id format'),
  validatorMiddleware
];

const updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) =>
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(new Error(`Your are not allowed to perform this action`));
        }
      })
    ),
  validatorMiddleware
];

const deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) => {
      if (req.user.role === 'user') {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(new Error(`There is no review with id ${val}`));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(new Error(`Your are not allowed to perform this action`));
          }
        });
      }
      return true;
    }),
  validatorMiddleware
];

module.exports = {
  getReviewValidator,
  createReviewValidator,
  deleteReviewValidator,
  updateReviewValidator
};
