const mongoose = require('mongoose')
const Schema = mongoose.Schema


var cartSchema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  quantity: Number,
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart