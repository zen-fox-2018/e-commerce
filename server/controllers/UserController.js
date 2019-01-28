const User = require('../models/User')
const { generateToken, comparePassword } = require('../helpers')

module.exports = {
    register: function (req, res) {
        let newUser = { name, email, password } = req.body
        newUser.avatar = req.file.cloudStoragePublicUrl
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                err = err.errors
                if (err.hasOwnProperty('name')) {
                    res.status(400).json(err.name.message)
                } 
                else if (err.hasOwnProperty('email')) {
                    console.log('masukkk')
                    res.status(400).json(err.email.message)
                } 
                else if (err.hasOwnProperty('password')) {
                    res.status(400).json(err.password.message)
                }
                else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
    },
    registerTest: function(req, res) {
        let newUser = { name, email, password } = req.body
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                err = err.errors
                if (err.hasOwnProperty('name')) {
                    res.status(400).json(err.name.message)
                } 
                else if (err.hasOwnProperty('email')) {
                    console.log('masukkk')
                    res.status(400).json(err.email.message)
                } 
                else if (err.hasOwnProperty('password')) {
                    res.status(400).json(err.password.message)
                }
                else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
    },
    login: function(req, res) {
        User
            .findOne({ email: req.body.email })
            .then(user => {
                if(user) {
                    if(comparePassword(req.body.password, user.password)) {
                        let token = generateToken({
                            name: user.name,
                            email: user.email
                        })
                        res.status(200).json({
                            token: token,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        })
                    } else {
                        res.status(400).json({
                            msg: `Wrong Email/Password`
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: `Wrong Email/Password`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal Server Error`
                })
            })
    },
    findOne: function(req, res) {
        User
            .findOne({ _id: req.currentUser._id })
            .then(user => {
                res.status(200).json({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    _id: user._id,
                    role: user.role
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            })
    },
}