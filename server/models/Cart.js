const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    itemId: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    userId: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    }
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;