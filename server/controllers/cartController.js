 const Cart = require('../models/Cart')
 const Product = require('../models/Product')
 const ObjectId = require('mongoose').Types.ObjectId

 module.exports = {
    createCart : (req, res) => {
        Cart
            .findOne({productId: ObjectId(req.body.productId)})
            .then(cart => {
                if(cart) {
                    addQty = cart.qty + 1
                    cart.set({qty: addQty})
                    return cart.save()
                } else {
                    let newCart = { userId, productId, qty } = req.body
                    return Cart.create(newCart)
                }
            })
            .then(cart => {
                res.status(201).json({ data: cart })
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    getAllCart: (req, res) => {
        Cart
            .find({userId: ObjectId(req.current_user._id) })
            .populate({
                path: 'userId',
                select: 'email address'
            })
            .populate('productId')
            .then(carts => {
                res.status(200).json({ carts })
            }).catch(err => {
                res.status(500).json(err)
            });
    },
    addQty: (req, res) => {
        Cart
            .findOne({_id: ObjectId(req.params.id)})
            .then(cart => {
                addQty = cart.qty + 1
                cart.set({qty: addQty})
                return cart.save()
            })
            .then(updated => {
                res.status(200).json({
                    msg: 'Success add item',
                    data: updated
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    reduceQty: (req, res) => {
        Cart
            .findOne({_id: ObjectId(req.params.id)})
            .then(cart => {
                if(cart.qty > 1) {
                    let reduceQty = cart.qty - 1
                    cart.set({qty: reduceQty})
                    return cart.save()
                } else if (cart.qty == 1) {
                    return cart.remove({_id: ObjectId(req.params.id)})
                }
            })
            .then(updated => {
                res.status(200).json({
                    msg: 'Success remove item',
                    data: updated
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    removeCart: (req, res) => {
        Cart
            .findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json({ data: deleted})
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    emptyCart: (req, res) => {
        Cart
            .find({userId: ObjectId(req.body.userId)})
            .then(products => {
                console.log(products)
                products.forEach(function(element) {
                    // query update
                })
            })
            .catch(err => {
                console.log(err)
            })
        // Cart
        //     .deleteMany({userId: ObjectId(req.body.userId)})
        //     .then(emptyCart => {
        //         console.log('SUKSES')

        //         res.status(200).json({ data: emptyCart})
        //         console.log(emptyCart, '=========')
        //     })
        //     .catch(err => {
        //         res.status(500).json(err.message)
        //     })
    }
 }