const express = require('express');

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  changeUserPassword,
  resizeImage,
  uploadProfileImage
} = require('../services/user.services');

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator
} = require('../utils/validators/userValidators');

const router = express.Router();

router.route('/changePassword/:id').patch(changeUserPassword);

router
  .route('/')
  .get(getAllUsers)
  .post(uploadProfileImage, resizeImage, createUserValidator, createUser);

router
  .route('/:id')
  .get(getUserValidator, getUserById)
  .patch(uploadProfileImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
