const User = require('../models/User')
const { generateToken, comparePassword } = require('../helpers')
const Product = require('../models/Product')

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
                            role: user.role,
                            wishlist: user.wishlist
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
            .populate('wishlist')
            .then(user => {
                res.status(200).json({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    _id: user._id,
                    role: user.role,
                    wishlist: user.wishlist
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            })
    },
    rateProduct: function (req, res) {
        User
            .findOne({ _id: req.currentUser._id })
            .then(user => {
              return Product
                        .findOne({ _id: req.params.productId })
            })
            .then(product => {
                let filter = product.rating.filter(val => {
                    return String(val._id) === String(req.currentUser._id)
                })
                if (filter.length) {
                    res.status(400).json({
                        message: `You already rate this product`
                    })
                } else {
                    return Product
                        .findOneAndUpdate({ _id: req.params.productId }, { $inc: {ratingPoint: +req.body.ratingPoint},$push: { rating: req.currentUser._id }}, {new: true})  
                }
            })
            .then(result => {
                let avgPoint = Math.floor(result.ratingPoint/result.rating.length)
                return Product
                        .findOneAndUpdate({ _id: req.params.productId }, {$set: {ratingPoint: avgPoint}}, {new: true})
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    wishlistProduct: function (req, res) {
        User
            .findOne({ _id: req.currentUser._id })
            .then(user => {
                let filter = user.wishlist.filter(val => {
                    return String(val._id) === String(req.params.productId)
                })
                if (filter.length) {
                    res.status(400).json({
                        message: `You already wishlist this product`
                    })
                } else {
                    return User 
                            .findOneAndUpdate({ _id: req.currentUser._id }, {$push: {wishlist: req.params.productId}}, {new: true})
                }
            })
            .then(result => {
                console.log(result)
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    removeWishList: function (req, res) {
        User
            .findOneAndUpdate({ _id: req.currentUser._id }, {$pull: {wishlist: req.params.productId}}, {new: true})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}