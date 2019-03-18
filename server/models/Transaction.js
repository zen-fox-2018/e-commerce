const mongoose = require('mongoose')
const Schema = mongoose.Schema


var transactionSchema = new Schema({
  carts: Array,
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  status: String,
  shippedto: String,
  courier: String,
  totalprice: Number,
  date_order: Date,
  date_received: Date,

});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction