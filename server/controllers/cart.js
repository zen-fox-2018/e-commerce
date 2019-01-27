const Cart = require('../models/cart');

module.exports = {
  create(req, res) {
    Cart.create({
      user: req.user._id,
      product: req.body.product,
      amount: req.body.amount
    })
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  },
  remove(req, res) {
    Cart.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        console.log(response)
        res.status(200).json(req.params.id)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  },
  getAll(req, res) {
    Cart.find({
      user: req.user.id
    })
      .populate('product')
      .then(carts => {
        console.log(req.user)
        res.status(200).json(carts)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  },
  updateCart(req, res) {
    Cart
      .findOneAndUpdate({
        _id: req.params.id
      }, req.body, {new: true})
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}