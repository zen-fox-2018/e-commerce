const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'title field cant empty']
  },
  author: {
    type: String,
    required: [true, 'author field cant empty']
  },
  publisher: {
    type: String,
    required: [true, 'publisher field cant empty']
  },
  price: {
    type: Number,
    required: [true, 'price field cant empty']
  },
  stock: {
    type: Number,
    required: [true, 'stock field cant empty']
  },
  tag: {
    type: String,
    required: [true, 'tag field cant empty']
  },
  image: {
    type: String,
    required: [true, 'image field cant empty']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;