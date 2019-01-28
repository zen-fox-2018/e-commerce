const { User, Cart } = require('../models')
const { comparePass } = require('../helpers')
const jwt = require('jsonwebtoken')

module.exports = {
    register(req, res) {
        const newUser = { name, email, password } = req.body
        let userData = {}
        User
            .create(newUser)
            .then(user => {
                userData = user
                return Cart.create({userId: user._id})
            })
            .then(cart => {
                userData = {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email
                }
                res.status(201).json(userData)
            })
            .catch(err => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(500).json({
                        msg: "Internal server error",
                        error: err
                    })
                }
            })
    },
    login(req, res) {
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePass(req.body.password, user.password)) {
                        let token = jwt.sign({email: user.email}, process.env.JWT_SECRET)
                        res.status(200).json({token})
                    } else {
                        console.log('hi');
                        res.status(400).json({
                            msg: "email / password wrong"
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: "email / password wrong"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    }
}