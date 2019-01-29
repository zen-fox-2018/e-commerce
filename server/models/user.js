const {Schema, model} = require('mongoose');
const {hashPassword} = require('../helpers/helper');

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String, 
    required: true, 
    validate: {
      isAsync: true,
      validator: ((value, cb) => {
        User.findOne({
          email: value
        }, function(err, res) {
          cb(!res, 'Email aready registered');
        })
      })
    },
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    minlength: [8, 'Password minimum length is 8']
  },
  role: String
})

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model('User', userSchema);

module.exports = User