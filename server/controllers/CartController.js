const Cart = require('../models/Cart')
const Product = require('../models/Product')

module.exports = {
    addToCarts: function (req, res) {
        Cart
            .find({ userId: req.currentUser._id })
            .populate('userId')
            .populate('products')
            .then(carts => {
                if(!carts.length) {
                    let newCart = {
                        userId: req.currentUser._id,
                        products: req.params.productId
                    }
                    
                    return Cart
                            .create(newCart)
                } 
                if (carts.length) {
                    let condition = carts.filter(val => {
                        return String(val.products._id) === String(req.params.productId)
                    })
                    let condition2 = condition.filter(val => {
                        return val.products.stock > val.qty
                    })
                    if (condition.length && condition2.length) {
                        return Cart
                        .findOneAndUpdate({ products: req.params.productId }, { $inc: {qty: +1, } }, { new: true })
                        .populate('products')
                        .populate('userId')
        
                    } 
                    else if (condition.length && !condition2.length) {
                        res.status(400).json({
                            msg: `Out of stock!`
                        })
                    }
                    else {
                        let newCart2 = {
                            userId: req.currentUser._id,
                            products: req.params.productId
                        }
                        return Cart
                                .create(newCart2)
                    }
                }
            })
            .then(result => {
                return Cart
                        .findOne({ products: result.products})
                        .populate('userId')
                        .populate('products')
            })
            .then(response => {
                return Cart
                        .findOneAndUpdate({ products: req.params.productId }, {$set: {totalPrice: response.products.price * response.qty}}, {new: true})
            })
            .then(result => {
                return Cart
                    .find({ userId: req.currentUser._id })
                    .populate('products')
                    .populate('userId')
            })
            .then(finalRes => {
                res.status(200).json(finalRes)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    removeItemFromCart: function (req, res) {
        Cart
            .findOne({ products: req.params.productId })
            .populate('products')
            .populate('userId')
            .then(product => {
                if (product.qty > 1) {
                   return Cart
                            .findOneAndUpdate({ products: req.params.productId}, {$inc: {qty: -1, totalPrice: -product.products.price}}, {new: true})
                            .populate('products')
                            .populate('userId')
                } else {
                    return Cart
                            .findOneAndDelete({ products: req.params.productId })
                }
            })
        
            .then(removed => {
                return Cart
                        .find({ userId: req.currentUser._id })
                        .populate('products')
                        .populate('userId')
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
    removeCart: function (req, res) {
        Cart
            .deleteMany({ userId: req.currentUser._id })
            .then(() => {
                res.status(200).json({
                    msg: `Successfully deleted this carts!`
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    },
    findCart: function (req, res) {
        Cart
            .find({ userId: req.currentUser._id})
            .populate('userId')
            .populate('products')
            .then(userCart => {
                res.status(200).json(userCart)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}