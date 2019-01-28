const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helper/helper')

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "email must be filled"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: {
      validator: function (email) {
        return new Promise((resolve, reject) => {
          User
            .findOne({ email: email, _id: { $ne: this._id } })
            .then(found => {
              if (found) {
                reject(false)
              } else {
                resolve(true)
              }
            })
        })
      }, msg: `email is used`
    }
  },
  password: {
    type: String,
    required: [true, "password must be filled"]
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  role: {
    type: String,
    default: 'Customer'
  }
})

userSchema.pre('save', function (next) {
  this.password = encrypt(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User