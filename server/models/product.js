const {Schema, model} = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  image: String,
  description: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Product = model('Product', productSchema);

module.exports = Product;