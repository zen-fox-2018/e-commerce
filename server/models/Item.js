const mongoose = require('mongoose')
const Schema = mongoose.Schema


var itemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item