const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId, 
    ref: 'Product'
  },
  amount: {
    type: Number,
    required: true,
    default: 1
  }
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;