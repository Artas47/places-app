const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(new HttpError('FAILED', 500));
  }
  res.send({ users });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Signup failed, try again later'));
  }

  if (existingUser) {
    return next(new HttpError('User already exist', 422));
  }

  const createdUser = new User({
    name,
    email,
    // image: req.file.path,
    password,
    places: [],
  });

  req.file ? (createdUser['image'] = req.file.path) : null;

  try {
    await createdUser.save();
    res.status(201).send({ createdUser });
  } catch (err) {
    return next(new HttpError('Creating user failed'));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Looging  in failed, try again later'));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError('Email or password are incorrect', 422));
  }

  res.send({
    message: 'logged in',
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
