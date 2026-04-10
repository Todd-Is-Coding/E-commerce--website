const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const httpStatus = require('../utils/httpStatus');
const Category = require('../models/category.model');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');

const getCategories = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .filter()
    .search()
    .limitFields()
    .sort();

  await apiFeatures.paginate();

  const { mongoQuery, paginationResult } = apiFeatures;
  const categories = await mongoQuery;

  res.status(200).json({
    status: httpStatus.SUCCESS,
    paginationResult,
    data: categories
  });
});

const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new AppError('No category with this id ', 404));
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: category
  });
});

const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError('Category name is required', 400));
  }

  const newCategory = await Category.create({
    name: name,
    slug: slugify(name)
  });

  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: newCategory
  });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      slug: slugify(req.body.name)
    },
    {
      runValidators: true,
      new: true
    }
  );

  if (!updatedCategory) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: updatedCategory
  });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(204).json({
    status: httpStatus.SUCCESS,
    data: null
  });
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
