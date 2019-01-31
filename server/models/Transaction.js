const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: Date,
    default: new Date()
  },
  status: {
    type: String,
    default: "Dikirim"
  },
  total: {
    type: Number
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction