const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name:  {
    type: String,
    required: [true, 'name should not be empty']
  },
  description: {
    type: String,
    required: [true, 'description should not be empty']
  },
  price: {
    type: Number,
    required: [true, 'price should not be empty']
  },
  stock: {
    type: Number,
    required: [true, 'stock should not be empty']
  },
  imageUrl: {
    type: String,
    required: [true, 'should provide photo']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
