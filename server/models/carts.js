const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: 'ObjectId',
    ref: 'User'
  },
  products: [ 
    {
      productId : 
        {
          type: 'ObjectId',
          ref: 'Product'
        },
      quantity:
        {
          type: Number,
          default: 1 
        }
    }
  ]
},
{
  timestamps: {}
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;