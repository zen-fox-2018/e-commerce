const Transaction = require('../models/Transaction')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

module.exports = {
  create: function (req, res) {
    Cart
      .find({ userId: req.currentUser._id })
      .populate('userId')
      .populate('products')
      .then(carts => {
        if(carts.length) {
          let transactions = []
          let qty = 0
          let totalPrice = 0
          carts.forEach(val => {
            let newTransaction = {}
            if(val !== null) {
              newTransaction.carts = val
              newTransaction.userId = req.currentUser._id
              newTransaction.products = val.products
              qty += val.qty
              totalPrice+= val.totalPrice
              newTransaction.qty = qty
              newTransaction.totalPrice = totalPrice
              transactions.push(newTransaction)
            }
          })
          return Transaction
                      .insertMany(transactions)
        }
      })
      .then(result => {
          res.status(200).json(result)
      })
      .catch(err => {
        res.status()
      })
  },
  confirmed: function (req, res) {
    Transaction
      .findOneAndUpdate({ _id: req.params.id }, {$set: {status: 'Received'}}, {new: true})
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  findAllTransactionCheckout: function (req, res) {
    Transaction
      .find({userId: req.currentUser._id})
      .populate('userId')
      .populate(({
        path: 'carts',
        populate: {path: 'products'}
      }))
      .sort('-createdAt')
      .then(transactions => {
        let filter = transactions.filter(val => {
          return val.carts !== null
        })
        if (filter.length) {
          res.status(200).json(filter)
        }
        
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  findAllTransactionConfirmed: function (req, res) {
    Transaction
      .find({ status: 'Received'})
      .populate('products')
      .populate('userId')
      .sort('-createdAt')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(200)
      })
  },
  findAllMyTransaction: function (req, res) {
    Transaction
      .find({userId: req.currentUser._id})
      .populate('products')
      .populate('userId')
      .sort('-createdAt')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}