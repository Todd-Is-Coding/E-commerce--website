const express = require('express');

const {
  createBrand,
  getBrandById,
  deleteBrand,
  getAllBrands,
  updateBrand
} = require('../services/brand.services');

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator
} = require('../utils/validators/brandValidators');

const router = express.Router();

router.route('/').post(createBrandValidator, createBrand).get(getAllBrands);

router
  .route('/:id')
  .get(getBrandValidator, getBrandById)
  .patch(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
