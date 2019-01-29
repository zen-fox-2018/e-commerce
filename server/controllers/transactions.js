const { Transaction } = require('../models');

class TransactionController {
  static getAll (req, res) {
    Transaction.find({})
      .then(transactions => {
        res.status(200).json(transactions);
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        });
      })
  }

  static getMine (req, res) {
    Transaction.find({
      userId: req.user._id
    })
      .then(transactions => {
        res.status(200).json(transactions);
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        });
      })
  }

  static updateStatus (req, res) {
    Transaction.findByIdAndUpdate(req.params.id, {
      status: 1
    }, {
      new: true
    })
      .then(transaction => {
        res.status(200).json(transaction);
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        })
      })
  }
}

module.exports = TransactionController