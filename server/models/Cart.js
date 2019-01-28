const Product = require('./Product')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product id required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id required']
    },
    qty: {
        type: Number,
        default: 1
    },
    total: {
        type: Number
    }
}, {
    timestamps: true
})

CartSchema.pre('save', function(next) {
    Product.findById(this.productId)
        .then(found => {
            this.total = (found.price * this.qty)
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart