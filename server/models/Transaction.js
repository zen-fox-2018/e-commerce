var mongoose = require(`mongoose`)
var Schema = mongoose.Schema

var TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        qty: {
            type: Number
        }
    }],
    price: Number
})