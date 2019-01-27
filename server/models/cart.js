const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user id field cant empty']
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    total: Number
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart