const {Schema, model} = require('mongoose');

const transactionSchema = new Schema({
  cart: [{type: Schema.Types.ObjectId, ref: 'Cart'}],
  status: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;