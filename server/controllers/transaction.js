const Transaction = require('../models/transaction');

module.exports = {
  create(req, res) {
    Transaction.create({
      cart: req.body.cart,
      status: 'Sending',
      user: req.user._id
    })
      .then(transaction => {
        res.status(201).json(transaction)
      })
      .catch(err => {
        res.status(400).json({msg: err.message})
      })
  },
  getAll(req, res) {
    let option = {}
    if(req.user.role == undefined) {
      option.user = req.user._id
    }
    Transaction.find(option).populate('cart').populate('product')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(400).json({msg: err.message})
      })
  },
  update(req, res) {
    Transaction
      .findOneAndUpdate({
        _id: req.params.id
      }, req.body, {new: true})
      .then(transaction => {
        res.status(201).json(transaction)
      })
      .catch(err => {
        res.status(400).json({msg: err.message})
      })
  } 
}