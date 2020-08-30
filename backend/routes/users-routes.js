const express = require('express');

const usersController = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');

const router = new express.Router();

router.get('/', usersController.getUsers);

router.post('/signup', fileUpload.single('image'), usersController.signup);

router.post('/login', usersController.login);

module.exports = router;
