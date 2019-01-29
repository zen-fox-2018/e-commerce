var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tagSchema = new Schema ({
    name : {
        type : String
    },
    products : [{
        type : Schema.Types.ObjectId,
        ref : 'Product'
    }]
})

var Tag = mongoose.model('Tag', tagSchema)

module .exports = Tag;