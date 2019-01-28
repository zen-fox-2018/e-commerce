const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
    userId: {
      required: [true, 'user id is required'],
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    itemId: [{
        required: [true, 'item id is required'],
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    transactionCreated: {
        required: [true, 'transaction date is required'],
        type: Date,
        default: new Date()
    },
    transactionSuccess: false,
    transactionDone: Date
})

const Transaction = mongoose.model('Transaction', transactionsSchema);
module.exports = Transaction;