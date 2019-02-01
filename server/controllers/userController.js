const jwt = require('../helpers/jsonwebtoken');
const bcrypt = require('../helpers/bcrypt');
const User = require('../models/User');

module.exports = {
    signIn: function(req, res) {
        let token = jwt.createToken(req.currentUser.email)
        res.status(200).json({
            token: token,
            role: req.currentUser.role
        })
    },
    signUp: function(req, res) {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: bcrypt.generatePassword(req.body.password),
        })
        newUser.save(function(err) {
            if (err) res.status(400).json({err: err.message})
            else {
                res.status(200).json(newUser)
            }
        })
    }
}