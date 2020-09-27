const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  let users;
  console.log("res", res.paginatedResults);
  try {
    // users = await User.find({}, "-password");
    res.send({ ...res.paginatedResults });
  } catch (err) {
    return next(new HttpError("FAILED", 500));
  }
};

const signup = async (req, res, next) => {
  console.log("req.body", req.body);
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Signup failed, try again later"));
  }

  if (existingUser) {
    return next(new HttpError("User already exist", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError("Could not createe user, please try again later", 500)
    );
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    places: [],
  });

  req.file ? (createdUser["image"] = req.file.path) : null;

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Could not create user, please try again later", 500)
    );
  }

  try {
    await createdUser.save();
    res
      .status(201)
      .send({ userId: createdUser.id, email: createdUser.email, token: token });
  } catch (err) {
    return next(new HttpError("Creating user failed"));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Looging  in failed, try again later"));
  }

  if (!existingUser) {
    return next(new HttpError("Email or password are incorrect", 422));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError("Could not log in, place check your credentials")
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Login failed, please try again later", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Logging failed, try again later"));
  }

  res.send({
    userId: existingUser.id,
    email: existingUser.email,
    token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
