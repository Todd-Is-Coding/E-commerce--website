const express = require('express');
const {getCategories} = require('../services/category.services');
const router = express.Router();


router.get('/', getCategories);



module.exports = router;