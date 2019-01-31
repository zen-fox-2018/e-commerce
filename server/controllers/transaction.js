const Transaction = require('../models/Transaction')
const Cart = require('../models/Cart')

module.exports = {
  getMyTransaction(req,res) {
    console.log('masuk controller my transactions')
    let userId = req.current_user._id
    Transaction
      .find({ userId })
      .sort({createdAt: 1})
      .populate('productId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  confirmTransaction(req,res) {
    console.log('masuk confirm transaction')
    let transactionId = req.params.transactionId
    let { status } = req.body

    Transaction
      .findByIdAndUpdate(transactionId, { status }, { new: true })
      .then(transaction => {
        res.status(200).json({transaction, message: "Transaksi berhasil"})
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  getAllTransaction(req,res) {
    Transaction
      .find()
      .populate('productId')
      .populate('userId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  checkout(req, res) {
    let userId = req.current_user._id
    let { productId, total } = req.body

    Transaction
      .create({ userId, productId, total })
      .then(transaction => {
        newtransaction = transaction
        return Cart.deleteMany({ userId })
      })
      .then(cart => {
        res.status(201).json({ newtransaction, message: "success buy" })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: error.message })
      })
  },
}