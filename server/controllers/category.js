var Category = require('../models/category')

module.exports = {
    create : function(req, res){
        var input = {name} = req.body
        Category.create(input)
        .then(category => {
            res.status(201).json({
                data : category,
                message : 'category created'
            })
        })
        .catch(err => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
     },
     findAll : function(req, res){
        Category.find({})
        .populate('products')
        .exec(function(err, categories){
            if(err){
                res.status(500).json({
                    message : "Internal server error",
                    error : err
                })
            }else{
                if(categories.length == 0){
                    res.status(404).json({ message : 'there is no category'})
                }else{
                    res.status(200).json({categories})
                }
            }
        })
    },
    findOne : function(req, res){
        Category.findOne({ _id : req.params.id})
        .populate('products')
        .exec()
        .then(category => {
            res.status(200).json({category})
        })
        .catch(err  => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    update : function(req, res){
        var input = {name} = req.body
        Category.findOne ( {_id : req.params.id})
        .then((category) => {
            if(category){
                return Category.findByIdAndUpdate(req.params.id, {$set : input}, {new : true})
            }else{
                res.status(400).json({ message : 'category not found'})
            }
        })
        .then((updatedCategory) => {
            res.status(200).json({ updatedCategory })
        })
        .catch(err => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    delete : function(req, res){
        Category.findOne({ _id : req.params.id}, {select : '_id'})
        .then((category) => {
            if(category){
                return Category.findByIdAndRemove(req.params.id, {select : '_id'})
            }else{
                res.status(404).json({ message : 'category is not found'})
            }
        })
        .then((deletedCategory) => {
            res.status(204).json({ deletedCategory })
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    }
}