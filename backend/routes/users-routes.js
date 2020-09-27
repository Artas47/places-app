const express = require("express");

const usersController = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");
const paginatedResults = require("../middleware/pagination");
const User = require("../models/user");

const router = new express.Router();

router.get("/", paginatedResults(User), usersController.getUsers);

router.post("/signup", fileUpload.single("image"), usersController.signup);

router.post("/login", usersController.login);

module.exports = router;
