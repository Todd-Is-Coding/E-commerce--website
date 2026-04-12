const express = require('express');
const multer = require('multer');

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../services/category.services');
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator
} = require('../utils/validators/categoryValidators');

const upload = multer({ dest: 'uploads/categories' });

const subCategoryRouter = require('./subcategory.router');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRouter);

router
  .route('/')
  .get(getCategories)
  .post(upload.single('image'), createCategoryValidator, createCategory);

router
  .route('/:id')
  .get(getCategoryValidator, getCategoryById)
  .patch(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
