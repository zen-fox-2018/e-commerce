const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    developer: {
        type: String,
        required: [true, 'Developer is Required']
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    price: {
        type: Number, 
        required: [true, 'Price is Required']
    },
    description: {
        type: String, 
        required: [true, 'Description is Required']
    },
    image: {
        type: String,
        required: [true, 'Image is Required']
    }, 
    discountPrice: {
        type: Number,
        default: 0
    },
    dayRemaining: {
        type: Number,
        default: 0
    },
    category: [],
})

const Item = mongoose.model('Item', itemsSchema);
module.exports = Item;




