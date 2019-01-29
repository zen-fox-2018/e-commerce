var Product = require('../models/product')

module.exports = {
    create  :function(req, res){
        var input = {name, description, price, stock, category, tags} = req.body

        Product.create(input)
        .then(product => {
            res.status(201).json({
                data : product,
                message : 'product created'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })   
    },
    findAll  : function(req, res){
        Product.find({})
        .populate("tags")
        .populate("category")
        .exec()
        .then(products => {
            res.status(200).json({products})
        })
        .catch(err => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    findOne  : function(req, res){
        Product.findOne({_id : req.params.id})
        .populate("category")
        .exec()
        .then((product) => {
            res.status(200).json({product})
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    update :  function(req, res){
        var input = {name, description, price, stock, category, tags} = req.body
        for (const key in input) {
            if (input.hasOwnProperty(key) == undefined) {
                delete input[key]
            }
        }

        Product.findOne({_id : req.params.id})
        .then((product) => {
            if(product){
                return Product.findByIdAndUpdate(req.params.id, {$set : input}, {new : true})
            }else{
                res.status(404).json({ message : 'product is not found'})
            }
        })
        .then(updatedProduct => {
            res.status(200).json({ updatedProduct })
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    delete : function(req, res){
        Product.findOne({_id : req.params.id})
        .then((product) => {
            if(product){
                return Product.findByIdAndDelete({ _id : req.params.id }, {select : '_id'})
            }else{
                res.status(404).json({ message : 'product is not found'})
            }
        })
        .then(deletedProduct => {
            res.status(204).json({ deletedProduct })
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    }
}