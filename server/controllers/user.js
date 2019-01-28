const User = require('../models/user')
const {comparePassword} = require('../helpers')
const jwt = require('jsonwebtoken')
const Cart = require('../models/cart')

class UserController {
    static register (req, res) {
        let data = new Object
        let {username, email, password} = req.body
        User.create({username, email, password})
        .then(user => {
            data = user
            return Cart.create({userId: user._id})
        })
        .then(cart => {
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(err)
            if(!err.errors) {
                res.status(400).json({
                    msg: err
                })
            } else {
                res.status(400).json({
                    msg : err.errors
                })
            }
        })
    }

    static login (req, res) {
        let {email, password} = req.body
        User.findOne({email})
        .then(data => {
            if(data) {
                if(comparePassword(password, data.password)) {
                    let token =jwt.sign({
                        _id: data._id
                    }, `${process.env.JWT_SECRET}`)
                    res.json({token})
                } else {
                    res.status(400).json({
                        msg: "Username or Password seem to be wrong"
                    })
                }
            } else {
                res.status(400).json({
                    msg: "Username or Password seem to be wrong"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
    }
}

module.exports = UserController