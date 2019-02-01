const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name must be filled!']
    },
    description: {
        type: String,
        required: [true, 'Product description must be filled!']
    },
    stock: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        min: [1, 'Price cannot be null']
    },
    image: {
        type: String
    },
    rating: [
        {
            type: Schema.Types.ObjectId, ref: `User`
        }
    ],
    ratingPoint: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product