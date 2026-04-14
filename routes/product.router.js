const express = require('express');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages
} = require('../services/product.services');

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator
} = require('../utils/validators/productValidators');

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(uploadProductImages, resizeProductImages, createProductValidator, createProduct);

router
  .route('/:id')
  .get(getProductValidator, getProductById)
  .patch(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
