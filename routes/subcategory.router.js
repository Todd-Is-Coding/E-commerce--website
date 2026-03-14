const express = require('express');

const router = express.Router({mergeParams: true});

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


router.route('/').post(createSubCategoryValidator, createSubCategory).get(createFilterObj, getAllSubCategories);


router.route('/:id').get(getSubCategoryValidator, getSubCategoryById).patch(updateSubCategoryValidator, updateSubCategory).delete(deleteSubCategoryValidator, deleteSubCategory);


module.exports = router;