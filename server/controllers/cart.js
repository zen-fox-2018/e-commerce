const User = require('../models/User')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

module.exports = {
  addCart(req, res) {
    console.log('masuk controller addcart')
    let userId = req.current_user._id
    let { productId, quantity } = req.body
    Cart.findOne({ $and: [{ userId }, { productId }] })
      .then(product => {
        if (product) {
          console.log('barang sudah ada')
          // throw {message: 'product already in your cart'}
          return Cart.findOneAndUpdate({ $and: [{ userId }, { productId }] }, { $inc: { quantity } }, { new: true })
        } else {
          console.log('barang belum ada')
          return Cart.create({ userId, productId, quantity })
        }
      })
      .then(cart => {
        return cart.populate('productId').execPopulate()
      })
      .then(cart => {
        res.status(201).json({ cart, message: 'success add to cart' })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({ message: error.message })
      })
  },

  showCart(req, res) {
    console.log('show my cart', req.current_user._id)
    Cart
      .find({ userId: req.current_user._id })
      .populate('productId')
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ error, message: 'Internal Server Error' })
      })
  },

  deleteProductCart(req, res) {
    let { cartId } = req.params

    Cart.findByIdAndDelete(cartId)
      .then(cart => {
        res.status(200).json({ message: 'delete item from cart' })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({ error })
      })
  },

  increaseQuantity(req, res) {
    let { cartId } = req.params
    Cart.findByIdAndUpdate(cartId, { $inc: { quantity: 1 } }, { new: true })
      .then(cart => {
        res.status(200).json({ cart, message: 'add quantity item' })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({ error })
      })
  },

  decreaseQuantity(req, res) {
    let { cartId } = req.params
    Cart.findByIdAndUpdate(cartId, { $inc: { quantity: -1 } }, { new: true })
      .then(cart => {
        res.status(200).json({ cart, message: 'reduce quantity item' })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({ error })
      })
  }
}