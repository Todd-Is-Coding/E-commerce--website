const express = require('express');

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  resizeImage,
  uploadProfileImage
} = require('../services/user.services');



const router = express.Router();


router.route('/')
  .get(getAllUsers)
  .post(uploadProfileImage, resizeImage, createUser);

router.route('/:id')
  .get(getUserById)
  .patch(uploadProfileImage, resizeImage, updateUser)
  .delete(deleteUser);

module.exports = router;