const Cart = require('../models/Cart')

class CartController {

  static getCarts(req, res) {
    Cart.find({buyer: req.params.buyerId}).populate('item').populate('buyer')
      .then(function(carts) {
        res.status(200).json(carts)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static createCart(req, res) {
    let obj = {
      item: req.body.item,
      buyer: req.body.buyer,
      quantity: req.body.quantity
    }

    Cart.findOne({item: req.body.item, buyer: req.body.buyer})
      .then(function(cart) {
        if (cart) {
          cart.quantity = Number(cart.quantity) + Number(req.body.quantity)
          return cart.save()
        }
        else {
          return Cart.create(obj)
        }
      })
      .then(function(cart) {
        res.status(200).json(cart)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getCart(req, res) {
    Cart.findById(req.params.cartId)
      .then(function(cart) {
        res.status(200).json(cart)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateCart(req, res) {
    Cart.findOneAndUpdate({_id: req.params.cartId}, req.body, {new: true})
      .then(function(cart) {
        res.status(200).json(cart)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteCart(req, res) {
    Cart.findByIdAndRemove(req.params.cartId)
      .then(function(cart) {
        res.status(200).json(cart)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteAllCart(req, res) {
    Cart.deleteMany({buyer: req.params.userId})
      .then(function(cart) {
        res.status(200).json(cart)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }
}

module.exports = CartController