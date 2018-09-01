var mongoose = require('mongoose');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  firstname: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
