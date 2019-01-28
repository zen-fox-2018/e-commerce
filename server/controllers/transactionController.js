const Transaction = require('../models/Transaction');
const Cart = require('../models/Cart');

module.exports = {
    getMyTransactions: function(req, res) {
      Transaction
        .find({userId: req.currentUser._id})
        .populate('itemId')
        .exec((err, transactions) => {
          if (err) res.status(400).json({err: err.message});
          else {
            res.status(200).json(transactions);
          }
        })
    },
    getAllTransactions: function(req, res) {
        Transaction
          .find({}) 
          .populate('itemId')
          .populate('userId')
          .exec((err, transactions) => {
            if (err) res.status(400).json({err: err.message});
            else {
                res.status(200).json(transactions);
            }
        })
    },
    createTransaction: function(req, res) {
        let newTransaction = new Transaction({
            userId: req.currentUser._id,
            itemId: req.body.itemId
        })
        newTransaction.save(function(err) {
            if (err) res.status(400).json({err: err.message});
            else {
                Cart.findOneAndDelete({userId: req.currentUser._id}, function(err) {
                    if (err) res.status(400).json({err: err.message});
                    else {
                        res.status(200).json(newTransaction);
                    }
                })
            }
        })
    },
    successTransaction: function(req, res) {
        let update = { transactionSuccess: new Date() };
        Transaction.findByIdAndUpdate(req.params.transaction_id, update, function(err, updated) {
            if (err) res.status(400).json({err: err.message});
            else {
                res.status(200).json(updated);
            }
        })
    }
}
