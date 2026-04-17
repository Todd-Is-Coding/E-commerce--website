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

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(
    verifyToken,
    restrictedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

router
  .route('/:id')
  .get(getProductValidator, getProductById)
  .patch(verifyToken, restrictedTo('admin', 'manager'), updateProductValidator, updateProduct)
  .delete(verifyToken, restrictedTo('admin'), deleteProductValidator, deleteProduct);

module.exports = router;
