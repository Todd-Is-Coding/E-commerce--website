const Product = require('../models/product.model');
const { getOne, getAll, createOne, updateOne, deleteOne } = require('./factory');
const { addSlug } = require('../utils/slugHelpers');

const addProductSlug = (data) => addSlug(data, 'title');

const getAllProducts = getAll(Product, {
  modelName: 'Products',
  populate: ['category', 'subcategory']
});

const getProductById = getOne(Product, {
  modelName: 'Product',
  populate: ['category', 'subcategory']
});

const createProduct = createOne(Product, {
  preProcess: addProductSlug,
  populate: ['category', 'subcategory']
});

const updateProduct = updateOne(Product, {
  modelName: 'Product',
  preProcess: addProductSlug,
  populate: ['category', 'subcategory']
});

const deleteProduct = deleteOne(Product, {
  modelName: 'Product'
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
