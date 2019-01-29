const Cart = require('../models/Cart')
const Product = require('../models/Product')

class CartController {
    static createCart(req, res) {
        Cart.find({
            userId: req.decoded.id,
            statusCheckOut: 'undone'
        })
        .then( (result) => {
            if(!result[0] ) {
                let cart = new Cart({
                    cartItems: [],
                    userId: req.decoded.id
                })
                cart.save()
                    .then(result => {
                        res.status(201).json(result)
                    })
                    .catch(err => {
                        res.status(400).json(err.message)
                    })
            } else {
                res.status(200).json(result[0])
            }
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static readAllCart(req, res) {
        Cart.find({})
        .populate('cartItems._id')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static readCart(req, res) {
        Cart.find({
            userId: req.decoded.id,
            statusCheckOut: req.params.status
        })
        .populate('cartItems._id')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static updateIncrement(req, res) {
        Cart.findOne({
            _id: req.params.id,
            userId: req.decoded.id,
            'cartItems': { $elemMatch: { _id: req.body.itemId }} 
        })
        .then(result => { 
            if(result){
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded.id,
                    "cartItems._id": req.body.itemId,
                }, { 
                    $inc : {"cartItems.$.quantity" : 1, "cartItems.$.subTotal": req.body.increasePrice}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            } else {
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded.id
                }, { 
                    $push : {"cartItems" : {'_id' : req.body.itemId , 'quantity' : 1, 'subTotal': req.body.increasePrice }}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            }
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static updateCart(req, res) {
        Cart.findOne({
            _id: req.params.id,
            userId: req.decoded.id,
            'cartItems': { $elemMatch: { _id: req.body.itemId }} 
        })
        .then(result => { 
            if(result){
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded.id,
                    "cartItems._id": req.body.itemId,
                }, { 
                    $set : {"cartItems.$.quantity" : (req.body.quantity), "cartItems.$.subTotal": req.body.subTotal}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            } else {
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded.id
                }, { 
                    $push : {"cartItems" : {'_id' : req.body.itemId , 'quantity' : req.body.quantity, 'subTotal': req.body.subTotal }}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            }
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static deleteCartItem(req, res) {
        Cart.findOne({
            _id: req.params.id,
            userId: req.decoded.id,
            'cartItems': { $elemMatch: { _id: req.body.itemId }} 
        })
        .then(result => { 
            if(result){
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded.id
                }, { 
                    $pull : {"cartItems" : {'_id' : req.body.itemId }}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            } else {
                res.status(400).json({message: "item not found, you haven't buy this item"})   
            }
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static deleteCart(req, res) {
        Cart.deleteOne({ 
            _id: req.params.id 
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static checkOut(req, res) {
        Cart.update({
            _id: req.params.id,
            userId: req.decoded.id
        }, {
            statusCheckOut: "undelivered",
            totalPrice: req.body.grandTotal
        })
        .then(result => { 
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static arrived(req, res) {
        Cart.update({
            _id: req.params.id,
            userId: req.decoded.id
        }, {
            statusCheckOut: "done"
        })
        .then(result => { 
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }
}

module.exports = CartController