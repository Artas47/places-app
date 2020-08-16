const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res) => {
  res.send({ users: DUMMY_USERS });
};

const signup = (req, res) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    return next(new HttpError('Could add user, already exists', 422));
  }

  const newUser = { name, email, password };

  DUMMY_USERS.push(newUser);

  res.status(201).send({ user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError('Could not identify user'));
  }
  res.send({ message: 'Logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
