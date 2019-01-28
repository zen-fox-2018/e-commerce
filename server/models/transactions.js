const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: {
    type: 'ObjectId',
    ref: 'User'
  },
  products: [
    {
      productId: {
        type: 'ObjectId',
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  totalPrice: Number,
  status: {
    type: Number,
    default: 0
  },
  timestamps: {}
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;