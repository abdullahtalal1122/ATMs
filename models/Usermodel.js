const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  cnic: String,
  gender: String,
  balance: Number,
  isadmin: { type: Boolean, default: false },
  isstaff: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
