const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: `User`
    },
    products: {
        type: Schema.Types.ObjectId, ref: `Product`
    },
    qty: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        default: 0
    }
    
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart