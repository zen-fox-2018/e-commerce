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
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
})

var Product = mongoose.model('Product', ProductSchema)

module.exports = Product