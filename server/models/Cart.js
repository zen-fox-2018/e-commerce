var mongoose = require(`mongoose`)
var Schema = mongoose.Schema

var CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: `User`
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    qty: {
        type: Number,
        default: 1
    }
})

CartSchema.pre(`save`, function (next) {
    console.log(this.qty);
    next()
})


var Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart