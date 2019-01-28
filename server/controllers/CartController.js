const Cart = require('../models/Cart')
const mongoose = require('mongoose')
const Product = require('../models/Product')

class Controller {
    static create (req, res) {
        if (!req.body.productId) {
            res.status(400).json({
                msg: `Product id required`
            })
        } else if (!mongoose.Types.ObjectId.isValid(req.body.productId)) {
            res.status(400).json({
                msg: `Product id is not valid`
            })
        } else {
            Product.findById(req.body.productId)
                .then(found => {
                    if (!found) {
                        console.log('masuk not found')
                        res.status(404).json({
                            msg: `Product not found`
                        })
                    } else {
                        
                        if (String(found.userId) == String(req.currentUserId)) {
                            res.status(400).json({
                                msg: `You can not buy your own product`
                            })
                        } else {
                            let qty = 1

                            if (req.body.qty) {
                                qty = req.body.qty
                            }

                            if (qty > found.qty) {
                                res.status(400).json({
                                    msg: `Product quantity exceed`
                                })
                            } else {
                                let cart = {
                                    productId: req.body.productId,
                                    userId: req.currentUserId,
                                    qty
                                }
                        
                                Cart.create(cart)
                                    .then(data => {
                                        res.status(201).json({
                                            msg: `Success create cart`,
                                            data
                                        })
                                        req.io.emit('cart-change')
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            msg: err.message
                                        })
                                    })
                            }
                        }
                    }
                })
        }
    }

    static deleteOne (req, res) {
        Cart.findById(req.params.id).populate('productId').exec()
            .then(found => {
                return found.remove()
            })
            .then(del => {
                if (del) {
                    res.status(200).json({
                        msg: `Success deleting cart`
                    })
                    req.io.emit('cart-change')
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static deleteAll (req, res) {
        Cart.deleteMany({userId: req.currentUserId})
            .then(del => {
                res.status(200).json({
                    msg: `Deleting all cart / checkout`
                })
                req.io.emit('cart-change')
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static getMyCart (req, res) {
        Cart.find({userId: req.params.userId}).populate({path: 'productId', populate: {path: 'userId'}}).populate('userId').exec()
            .then(data => {
                if (data) {
                    res.status(200).json({
                        msg: `Success getting my cart`,
                        data
                    })

                } else {
                    res.status(404).json({
                        msg: `Cart not found`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static update (req, res) {

        let qty = req.body.qty

        Cart.findById(req.params.id).populate('productId').exec()
            .then(found => {
                if (qty > found.productId.qty) {
                    res.status(400).json({
                        msg: `Quantity exceed`
                    })
                } else {
                    found.set({qty})
                    return found.save()
                }
            })
            .then(saved => {
                if (saved) {
                    res.status(200).json({
                        msg: `Success update cart qty`,
                        data: saved 
                    })
                    req.io.emit('cart-change')
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })

        // Cart.findByIdAndUpdate(req.params.id, {$set: {qty}}, {new: true})
        //     .then(data => {
        //         res.status(200).json({
        //             msg: `Success update cart qty`,
        //             data
        //         })
        //     })
        //     .catch(err => {
        //         res.status(500).json({
        //             msg: err.message
        //         })
        //     })

    }
}
module.exports = Controller