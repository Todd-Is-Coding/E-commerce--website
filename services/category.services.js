const asyncHandler = require("express-async-handler");
const httpStatus = require("../utils/httpStatus");

const Category = require("../models/category.model");
const AppError = require("../utils/appError");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find(undefined, undefined, undefined);

  if(!categories){
    return new AppError("No category found." , 404);
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: categories,
  });
});

module.exports = {
  getCategories,
};
