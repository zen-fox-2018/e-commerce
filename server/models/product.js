const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var productSchema = new Schema({
    name : {
        type: String,
        required : [true, 'Name is required']
    },
    price : {
        type: Number,
        required: [true, 'Price is required']
    },
    stock : {
        type: Number,
        default: 0
    },
    img_name : {
        type : String
    },
    img_url : {
        type : String
    },
    create_at : {
        type: Date,
        default: new Date
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product