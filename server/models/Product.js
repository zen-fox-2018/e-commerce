var mongoose = require(`mongoose`)
var Schema = mongoose.Schema

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: String,
    imageUrl: String,
    weight: Number
})

var Product = mongoose.model('Product', ProductSchema)

module.exports = Product