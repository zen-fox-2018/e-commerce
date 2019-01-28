var mongoose = require('mongoose')
var Category = require('../models/category')
var Tag = require('../models/tag')
var Schema = mongoose.Schema

var productSchema = new Schema({
    name : {
        type : String,
    },
    description : {
        type : String
    },
    price : {
        type : Number
    },
    stock : {
        type : Number
    },
    images: {
        type : Array
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    },
    tags : [{
        type : Schema.Types.ObjectId,
        ref : 'Tag'
    }]
})

productSchema.pre('update', function(next) {
    this.update({},{ $set: { updatedAt: new Date() } });
    next()
})

productSchema.post('save', function(doc){
    Category.findOneAndUpdate({ _id : doc.category}, {'$push' : { 'products' : doc._id }}, function(err){
        if(err){
            throw new Error(err)
        }
    })
    doc.tags.forEach(tag => {
        Tag.findOneAndUpdate({ _id : tag}, {'$push' : { 'products' : doc._id }}, function(err){
            if(err) {
                throw new Error(err)
            }
        })
    });
})

var Product = mongoose.model('Product', productSchema)

module.exports = Product