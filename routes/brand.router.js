const express = require('express');

const {
  createBrand,
  getBrandById,
  deleteBrand,
  getAllBrands,
  updateBrand,
  uploadBrandImage,
  resizeImage
} = require('../services/brand.services');

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator
} = require('../utils/validators/brandValidators');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router();

router
  .route('/')
  .post(
    verifyToken,
    restrictedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  )
  .get(getAllBrands);

router
  .route('/:id')
  .get(getBrandValidator, getBrandById)
  .patch(
    verifyToken,
    restrictedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(verifyToken, restrictedTo('admin'), deleteBrandValidator, deleteBrand);

module.exports = router;
