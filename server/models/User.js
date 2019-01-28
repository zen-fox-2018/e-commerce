const mongoose = require('mongoose')
const Schema = mongoose.Schema


var userSchema = new Schema({
  name: String,
  email: { type: String, required: true, index: { unique: true } },
  username: String,
  role: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User