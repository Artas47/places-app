const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(new HttpError('FAILED', 500));
  }
  res.send({ users });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Signup failed, try again later'));
  }

  if (existingUser) {
    return next(new HttpError('User doesnt exist', 422));
  }

  const createdUser = new User({
    name,
    email,
    image: 'asdasddas',
    password,
    places: [],
  });

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
    return next(new HttpError('ERROR', 422));
  }

  res.send({ message: 'logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
