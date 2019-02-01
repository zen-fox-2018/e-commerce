const Transaction = require('../models/Transaction')

class TransactionController {

  static getTransactions(req, res) {
    Transaction.find()
      .then(function(transactions) {
        res.status(200).json(transactions)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static getTransactionsByBuyer(req, res) {
    Transaction.find({buyer: req.params.buyerId})
      .then(function(transactions) {
        res.status(200).json(transactions)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static createTransaction(req, res) {
    let obj = {
      carts: req.body.carts,
      buyer: req.body.buyer,
      name: req.body.name,
      status: "Waiting For Payment",
      shippedto: req.body.shippedto,
      courier: req.body.courier,
      totalprice: req.body.totalprice,
      date_order: new Date,
      date_received: "",
    }

    Transaction.create(obj)
      .then(function(transaction) {
        res.status(200).json(transaction)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getTransaction(req, res) {
    Transaction.findById(req.params.transactionId)
      .then(function(transaction) {
        res.status(200).json(transaction)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateTransaction(req, res) {
    Transaction.findOneAndUpdate({_id: req.params.transactionId}, req.body, {new: true})
      .then(function(transaction) {
        res.status(200).json(transaction)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteTransaction(req, res) {
    Transaction.findByIdAndRemove(req.params.transactionId)
      .then(function(transaction) {
        res.status(200).json(transaction)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }
}

module.exports = TransactionController