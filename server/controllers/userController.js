const User = require('../models/user');
const { compare, token } = require('../helpers/helper');

module.exports = {
  register: async (req, res) => {
    try {
      const newUser = await User.create({
        email: req.body.email.trim(),
        password: req.body.password.trim(),
        role: 'customer'
      });
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({
        errors: err
      });
    };
  },
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({
        message: 'email / password cant empty'
      });
    } else {
      try {
        const user = await User.findOne({
          email: req.body.email
        });
        if (!user) {
          res.status(400).json({
            message: 'invalid email / password'
          });
        } else {
          const check = compare(req.body.password, user.password);
          if (!check) {
            res.status(400).json({
              message: 'invalid email / password'
            });
          } else {
            res.status(200).json({
              token: token(user.email)
            });
          }
        };
      } catch (err) {
        res.status(500).json({
          errors: err
        });
      };
    }
  }
};