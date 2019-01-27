const User = require('../models/user');
const {generateToken, comparePassword, twillio} = require('../helpers/helper')

module.exports = {
  register(req, res, next) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(400).json({msg: err.message})
      })
  },
  login(req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        console.log(user)
        if (comparePassword(req.body.password, user.password)) {
          res.status(200).json({
            user,
            access_token: generateToken(user._id, user.email)
          })
        } else {
          res.status(400).json({msg: 'Authentication failed, wrong email/password'})
        }
      })
      .catch(err => {
        res.status(400).json({msg: err.message})
      })
  }
}