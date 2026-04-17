const express = require('express');

const {
  createSubCategory,
  getSubCategoryById,
  getAllSubCategories,
  deleteSubCategory,
  updateSubCategory,
  createFilterObj
} = require('../services/subcategory.services');

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator
} = require('../utils/validators/subcategoryValidators');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    verifyToken,
    restrictedTo('admin', 'manager'),
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterObj, getAllSubCategories);

router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategoryById)
  .patch(
    verifyToken,
    restrictedTo('admin', 'manager'),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(verifyToken, restrictedTo('admin'), deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
