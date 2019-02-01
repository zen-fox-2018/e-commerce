const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TransactionSchema = new Schema({
  carts: {
    type: Schema.Types.ObjectId, ref: `Cart`
  },
  userId: {
    type: Schema.Types.ObjectId, ref: `User`
  },
  products: {
    type:Schema.Types.ObjectId, ref: `Product`
  },
  status: {
    type: String,
    default: 'Shipping'
  },
  qty: {
    type: Number,
    default:0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction

