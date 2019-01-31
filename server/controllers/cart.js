const Cart = require('../models/cart')

class CartController {
    static getCartUser(req, res) {
        let userId = req.user._id
        Cart.findOne({userId})
        .populate('userId')
        .populate('products.productId')
        .then(cart => {
            res.json(cart)
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static addCart(req, res) {
        let userId = req.user._id
        let productId = req.body.productId
        Cart.findOne({userId})
        .populate('userId')
        .populate('products.productId')
        .then(cart => {
            let checkCart = cart.products.map(product => product.productId._id.toString()).indexOf(productId.toString())
            if(checkCart == -1) {
                let product = {
                    productId,
                    quantity: 1
                }
                cart.products.push(product)
                cart.save(err => {
                    console.log(err)
                })
                res.json(cart)
            } else {
                cart.products[checkCart].quantity++
                cart.save(err => {
                    console.log(err)
                })
                res.json(cart)
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static removeCart(req, res) {
        let userId = req.user._id
        let productId = req.body.productId
        Cart.findOne({userId})
        .populate('userId')
        .populate('productId')
        .then( cart => {
            cart.products = cart.products.filter(e => {
                return e.productId._id !=  productId
            })
            cart.save()
            res.json(cart)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

    static checkOut(req, res) {
        let userId = req.user._id
        Cart.findOne({userId})
        .then(cart => {
            console.log(cart.products)
            cart.products = []
            cart.save()
            res.json(cart)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
    }

}

module.exports = CartController