var Tag = require('../models/tag')

module.exports = {
    create : function(req, res){    
        var input = {name} = req.body
        Tag.create(input)
        .then(tag => {
            res.status(201).json({
                data: tag,
                message : 'tag created'
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
        Tag.find({})
        .populate('products')
        .exec()
        .then((tags) => {
            res.status(200).json({ tags })
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    findOne : function(req, res){
        Tag.findOne({ _id : req.params.id})
        .populate('products')
        .exec()
        .then((tag) => {
            res.status(200).json({ tag })
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    update : function(req, res){
        var input = {name} = req.body
        Tag.findOne ( {_id : req.params.id})
        .then((tag) => {
            if(tag){
                return Tag.findByIdAndUpdate(req.params.id, {$set : input}, {new : true})
            }else{
                res.status(400).json({ message : 'tag not found'})
            }
        })
        .then((updatedTag) => {
            res.status(200).json({ updatedTag })
        })
        .catch(err => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    delete : function(req, res){
        Tag.findOne({ _id : req.params.id}, {select : '_id'})
        .then((tag) => {
            if(tag){
                return Tag.findByIdAndRemove(req.params.id, {select : '_id'})
            }else{
                res.status(404).json({ message : 'tag is not found'})
            }
        })
        .then((deletedTag) => {
            res.status(204).json({ deletedTag })
        })
        .catch((err) => {
            
        })
    }
}