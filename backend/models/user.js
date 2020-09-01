const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const HttpError = require('./http-error');

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new HttpError('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: {
    type: String,
    // required: true,
  },
  places: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Place',
    },
  ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
