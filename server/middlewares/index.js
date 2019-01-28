const User = require('../models/User')
const Product = require('../models/Product')
const { decode } = require('../helpers')
const mongoose = require('mongoose')
const Cart = require('../models/Cart')

module.exports = {
    checkIdProduct: function(req, res, next) {
        let id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                msg: `Id is not valid`
            })
        } else {
            Product.findById(id)
                .then(found => {
                    if (!found) {
                        res.status(404).json({
                            msg: `Product not found`
                        })
                    } else {
                        if (String(found.userId) !== String(req.currentUserId)) {
                            res.status(401).json({
                                msg: `You are not authorized`
                            })
                        } else {
                            next()
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    },
    checkUser: function (req, res, next) {
        if (!req.headers.token) {
            res.status(400).json({
                msg: `Please login first`
            })
        } else {
            try {
                let id = decode(req.headers.token).id
                
                // if (id) 
                if (mongoose.Types.ObjectId.isValid(id)) {
                    User.findById(id) 
                        .then(found => {
                            if (!found) {
                                res.status(404).json({
                                    msg: `User not found`
                                })
                            } else {
                                req.currentUserId = id
                                next()
                            }
                        })
                        .catch(error => {
                            res.status(500).json({
                                msg: error.message
                            })
                        })
                } else {
                    res.status(400).json({
                        msg: `Id is not valid`
                    })
                }
               
            } catch (err) {
                res.status(400).json({
                    msg: err.message
                })
            }
        }
    },
    checkIdCart: function (req, res, next) {
        let id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                msg: `Id is not valid`
            })
        } else {
            Cart.findById(id)
                .then(found => {
                    if (!found) {
                        res.status(404).json({
                            msg: `Cart not found`
                        })
                    } else {
                        if (String(found.userId) !== String(req.currentUserId)) {
                            res.status(401).json({
                                msg: `You are not authorized`
                            })
                        } else {
                            next()
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }
}