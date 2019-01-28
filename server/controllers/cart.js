const { Cart } = require('../models')

module.exports = {
    getProduct(req, res, next) {
        Cart
            .findOne({userId: req.user._id})
            .populate('products.productId')
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    addProduct(req, res, next) {
        Cart
            .findOne({userId: req.user._id})
            .then(cart => {
                let index = cart.products.findIndex(function(e) {
                    return e.productId.toString() === req.body.productId.toString()
                })
                // console.log(index);
                if (index === -1) {
                    let input = {
                        productId: req.body.productId,
                        quantity: req.body.quantity
                    }
                    cart.products.push(input)
                    cart.save()
                    res.status(200).json(input)
                } else {
                    cart.products[index].quantity += req.body.quantity
                    cart.save()
                    res.status(200).json(cart.products[index])
                }
                // console.log(cart);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    updateProduct(req, res, next) {
        Cart
            .findOne({userId: req.user._id})
            .then(cart => {
                let index = cart.products.findIndex(function(e) {
                    return e.productId.toString() === req.body.productId.toString()
                })
                if (index === -1) {
                    res.status(404).json({
                        msg: "Product not found"
                    })
                } else {
                    cart.products[index].quantity = req.body.quantity
                    cart.save()
                    res.status(200).json(cart.products[index])
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    removeProduct() {
        Cart
            .findOne({userId: req.user._id})
            .then(cart => {
                let index = cart.products.findIndex(function(e) {
                    return e.productId.toString() === req.body.productId.toString()
                })
                if (index === -1) {
                    res.status(404).json({
                        msg: "Product not found"
                    })
                } else {
                    cart.products.splice(index, 1)
                    cart.save()
                    res.status(200).json({msg: "success remove product"})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    checkoutCart(req, res, next) {
        Cart
            .findOne({userId: req.user._id})
            .populate('products.productId')
            .then(cart => {
                let result = {
                    totalQuantity: 0,
                    totalPrice: 0
                }
                cart.products.forEach(product => {
                    result.totalQuantity += product.quantity
                    result.totalPrice += (product.quantity * product.productId.price)
                });
                cart.products = []
                cart.save()
                res.status(200).json(result)
                // console.log(result);

            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    }
}