const express = require('express');

const { addProductToWishlist } = require('../services/wishlist.services');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router();

router.route('/').post(verifyToken, restrictedTo('user'), addProductToWishlist);

module.exports = router;
