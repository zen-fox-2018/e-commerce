const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema ({
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;