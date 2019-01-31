const Product = require('../models/product')
class ProductController {
    static create(req, res) {
        let {name , price, stock} = req.body
        Product.create({
            name,
            price,
            stock,
            img_url: req.file.cloudStoragePublicUrl,
            img_name: req.file.cloudStorageObject,
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err.errors)
            if(err.errors) {
                res.status(400).json({
                    msg: err.errors
                })
            } else {
                res.status(500).json({
                    msg : 'Internal Server Error'
                })
            }
        })
    }

    static getOne(req, res) {
        let _id = req.params.id
        Product.findOne({_id})
        .then(product => {
            res.json(product)
        })
        .catch(err => {
            res.status(500).json({err: err.message})
        })
    }

    static getAll(req, res) {
        Product.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json( {
                msg: err
            })
        })
    }

    static delete(req, res) {
        let {_id} = req.params
        Product.deleteOne({_id})
        .then(result => {
            res.json({result})
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({msg : 'Internal Server Error'})
        })
    }

    static update(req, res) {
        let {_id} = req.params
        let {name, price, stock} = req.body
        Product.updateOne({_id}, {name, price, stock})
        .then(data => {
            console.log(data)
            if(data) {
                res.json(data)
            } else {
                res.status(400).json({
                    msg: `Product Not Found`
                })
            }
        })
        .catch(err => {
            if(err.errors) {
                res.status(400).json({msg: err.errors})
            } else {
                res.status(500).json({msg : `Internal Server Error`})
            }
        })
    }
}
module.exports = ProductController