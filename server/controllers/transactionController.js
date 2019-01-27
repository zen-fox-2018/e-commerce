const Transaction = require('../models/transaction');

module.exports = {
  read: async (req, res) => {
    try {
      let transaction = await Transaction.find()
      res.status(200).json(transaction)
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    } 
  },
  readOne: async (req, res) => {
    try {
      let transaction = await Transaction.find({
        user: req.decoded._id
      })
      res.status(200).json(transaction)
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    }
  },
  update: async (req, res) => {
    try {
      let updated = await Transaction.findOneAndUpdate(req.params.id, {
        status: 'Arrived'
      }, {
        new: true
      })
      res.status(200).json(updated)
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    }
  }
}