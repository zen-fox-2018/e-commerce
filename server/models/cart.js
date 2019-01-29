var mongoose  = require('mongoose');
var User = require('../models/user')
var Schema = mongoose.Schema

var cartSchema = new Schema ({
    product : { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity :  Number,
    point : Number,
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    totalPrice : Number
})


var Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;