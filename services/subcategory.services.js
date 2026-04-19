const SubCategory = require('../models/subcategory.model');
const { getOne, getAll, updateOne, deleteOne, createOne } = require('./factory');
const { addSlug } = require('../utils/slugHelper');
const setIdToBody = require('../middlewares/setIdToBody');

const processSubCategoryData = (data) => {
  data.category = data.categoryId;
  return addSlug(data);
};

const createSubCategory = createOne(SubCategory, {
  preValidate: setIdToBody('categoryId', 'category'),
  preProcess: processSubCategoryData,
  populate: 'category'
});

const getSubCategoryById = getOne(SubCategory, {
  modelName: 'Subcategory',
  populate: 'category'
});

const getAllSubCategories = getAll(SubCategory, {
  modelName: 'Subcategory',
  populate: 'category'
});

const updateSubCategory = updateOne(SubCategory, {
  modelName: 'Subcategory',
  preProcess: processSubCategoryData,
  populate: 'category'
});

const deleteSubCategory = deleteOne(SubCategory, {
  modelName: 'Subcategory'
});

module.exports = {
  createSubCategory,
  getSubCategoryById,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory
};
