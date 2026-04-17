const asyncHandler = require('express-async-handler');

const User = require('../models/user.model');
const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');
const generateToken = require('../utils/generateToken');

const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, profileImg } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    phone,
    profileImg
  });

  const token = generateToken(user._id);

  user.password = undefined;

  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: user,
    token: token
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }

  const user = await User.findOne({ email });

  if (!user || !user.verifyPassword(password)) {
    return next(new AppError('Invalid email or password', 400));
  }

  const token = generateToken(user._id);

  user.password = undefined;

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: user,
    token: token
  });
});

module.exports = {
  signUp,
  login
};
