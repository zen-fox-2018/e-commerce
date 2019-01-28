var mongoose  = require('mongoose');
var User = require('../models/user')
var Schema = mongoose.Schema

var cartSchema = new Schema ({
    products : [{
        product : { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity :  Number,
        subtotal : Number,
        point : Number
    }],
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    quantity : Number,
    totalPrice : Number,
    totalPoint : Number
})

cartSchema.post('save', function(doc){
    var countQuantity = 0,
        countPoint = 0,
        countTotal = 0;
    doc.products.forEach(product => {
        countQuantity = countQuantity + product.quantity;
        countTotal = countTotal + product.subtotal;
        countPoint = countPoint + product.point;
    });
    doc.quantity = countQuantity;
    doc.totalPrice = countTotal;
    doc.totalPoint = countPoint;
})

cartSchema.post('findOneAndUpdate', function(doc){
    var countQuantity = 0,
        countPoint = 0,
        countTotal = 0;
    doc.items.forEach(item => {
        countQuantity = countQuantity + item.quantity;
        countTotal = countTotal + item.subtotal;
        countPoint = countPoint  + item.point;
    });
    doc.quantity = countQuantity;
    doc.totalPrice = countTotal;
    doc.totalPoint = countPoint

})

var Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;