const express = require('express');

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

const subCategoryRouter = require('./subcategory.router');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRouter);

router.route('/').get(getCategories).post(createCategoryValidator, createCategory);

router
    .route('/:id')
    .get(getCategoryValidator, getCategoryById)
    .patch(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
