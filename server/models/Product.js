const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const productSchema = new Schema({
  name: String,
  description: String,
  price: {
    type: Number,
    default: 0
  },
  stock: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  imageUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt:{
    type: Date,
    default: new Date()
  },
  weight: {
    type: Number,
    default: 700
  }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product