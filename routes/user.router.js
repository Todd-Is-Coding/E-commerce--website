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
  deleteUserValidator,
  changeUserPasswordValidator
} = require('../utils/validators/userValidators');

const verifyToken = require('../middlewares/verifyToken');
const restrictedTo = require('../middlewares/restrictedTo');

const router = express.Router();

router.route('/changePassword/:id').patch(changeUserPasswordValidator, changeUserPassword);

router
  .route('/')
  .get(verifyToken, restrictedTo('admin'), getAllUsers)
  .post(
    verifyToken,
    restrictedTo('admin'),
    uploadProfileImage,
    resizeImage,
    createUserValidator,
    createUser
  );

router
  .route('/:id')
  .get(verifyToken, restrictedTo('admin'), getUserValidator, getUserById)
  .patch(
    verifyToken,
    restrictedTo('admin'),
    uploadProfileImage,
    resizeImage,
    updateUserValidator,
    updateUser
  )
  .delete(verifyToken, restrictedTo('admin'), deleteUserValidator, deleteUser);

module.exports = router;
