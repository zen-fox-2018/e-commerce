var mongoose = require('mongoose')
var Schema = mongoose.Schema

var categorySchema = new Schema({
    name : {
        type : String
    },
    products : [{
        type : Schema.Types.ObjectId,
        ref : 'Product'
    }]
})

var Category = mongoose.model('Category', categorySchema)

module.exports = Category;