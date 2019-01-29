const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name required"]
  },
  price: {
    type: Number,
    min: [1, "Price required"]
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock must greater than equal 0"]
  },
  image_url: {
    type: String,
    required: [true, "Must upload an image"]
  },
  image_filename: String
},
{
  timestamps: {}
})

let Product = mongoose.model('Product', productSchema);

module.exports = Product;