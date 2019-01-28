const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products : [{
        productId : {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        }
    }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart