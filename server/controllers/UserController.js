const User = require('../models/User')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(process.env.SALT);
const jwt = require('jsonwebtoken')

class UserController {

  static getUsers(req, res) {
    User.find()
      .then(function(users) {
        res.status(200).json(users)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static register(req, res) {
    let password = bcrypt.hashSync(req.body.password, salt);
    let obj = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: password,
      role: "Buyer"
    }

    User.create(obj)
      .then(function(user) {
        res.status(200).json(user)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getUser(req, res) {
    User.findById(req.params.userId)
      .then(function(user) {
        res.status(200).json(user)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body)
      .then(function(user) {
        res.status(200).json(user)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.id})
      .then(function(user) {
        res.status(200).json(user)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static signin(req, res) {
    User.findOne({email: req.body.email})
      .then(function (user) {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          let payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }

          let token = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({
            token: token,
            id: payload._id,
            name: payload.name
          })
        }
        else {
          res.status(401).json({
            message: "Wrong email/password",
          })
        }
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal server error",
          error: error.message
        })
      })
  }

  static admincheck(req, res) {
    if (req.body.token) {
      var decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
      if (decoded.role == 'Admin') {
        res.status(200).json({
          admin: true
        })
      }
      else {
        res.status(200).json({
          admin: false
        })
      }
    }
    else {
      res.status(200).json({
        admin: false
      })
    }
  }
}

module.exports = UserController