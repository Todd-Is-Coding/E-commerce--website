const express = require('express');

const { signUp, login } = require('../services/auth.services');

const { signUpValidator, loginValidator } = require('../utils/validators/authValidators');

const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.route('/signup').post(signUpValidator, signUp);

router.route('/login').post(loginValidator, verifyToken, login);

module.exports = router;
