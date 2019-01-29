const { User } = require('../models');
const { bcrypt, jwt } = require('../helpers');
const CartController = require('./carts')
class UserController {
  static create(req, res) {
    let user = null;
    User
      .create({
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
      })
      .then(userData => {
        user = userData
        return CartController.create(userData._id)
      })
      .then(cart => {
        res.status(201).json(user);
      })
      .catch(error => {
        if (error.name == 'ValidationError') {
          res.status(400).json({
            message: error.name,
            error: error.errors
          })
        } else {
          res.status(500).json({
            message: error.message
          })
        }
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user && bcrypt.comparePassword(req.body.password, user.password)) {
          res.status(200).json({
            token: jwt.jwtSign(user.email)
          });
        } else {
          res.status(400).json({
            message: 'Login Failed',
            error: 'Wrong Username / Password'
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        })
      })
  }
}

module.exports = UserController;