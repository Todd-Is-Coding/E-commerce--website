const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user.model');
const { getOne, getAll, updateOne, deleteOne, createOne } = require('./factory');
const { addSlug } = require('../utils/slugHelper');
const { uploadSingleImage } = require('../middlewares/uploadImage');

const resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toFile(`uploads/users/${fileName}`);

    req.body.profileImg = fileName;
  }

  next();
});

const uploadProfileImage = uploadSingleImage('profileImg');

const getAllUsers = getAll(User, {
  modelName: 'User'
});

const getUserById = getOne(User, {
  modelName: 'User'
});

const updateUser = updateOne(User, {
  modelName: 'User',
  preProcess: addSlug
});

const deleteUser = deleteOne(User, {
  modelName: 'User'
});

const createUser = createOne(User, {
  preProcess: addSlug
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  resizeImage,
  uploadProfileImage
};
