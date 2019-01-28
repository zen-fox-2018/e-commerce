const Product = require('../models/Product')

module.exports = {
    create: function(req, res) {
        let newProduct = {name, description, stock, price} = req.body
        newProduct.image = req.file.cloudStoragePublicUrl
        Product
            .create(newProduct)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                err = err.errors
                if (err.hasOwnProperty('name')) {
                    res.status(400).json(err.name.message)
                } else if (err.hasOwnProperty('description')) {
                    res.status(400).json(err.description.message)
                } else if (err.hasOwnProperty('price')) {
                    res.status(400).json(err.price.message)
                }
                else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
    },
    createTest: function(req, res) {
        let newProduct = { name, description, stock, price } = req.body
        Product
            .create(newProduct)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                err = err.errors
                if (err.hasOwnProperty('name')) {
                    res.status(400).json(err.name.message)
                } else if (err.hasOwnProperty('description')) {
                    res.status(400).json(err.description.message)
                } else if (err.hasOwnProperty('price')) {
                    res.status(400).json(err.price.message)
                }
                else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
    },
    findAll: function (req, res) {
        Product
            .find({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    findOne: function (req, res) {
        Product
            .findOne({ _id: req.params.id })
            .then(product => {
                if (product) {
                    res.status(200).json(product)
                } else {
                    res.status(404).json({
                        msg: `Product not found`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    updateProduct: function (req, res) {
        let editProduct = {name, description, stock, price} = req.body
        Product
            .findOneAndUpdate({ _id: req.params.id }, editProduct, { new: true, runValidators: true})
            .then(product =>{
                if (product) {
                    res.status(200).json(product)
                } else {
                    res.status(404).json({
                        msg: `Product not found`
                    })
                }
            })
            .catch(err => {
                err = err.errors
                if (err.hasOwnProperty('name')) {
                    res.status(400).json(err.name.message)
                } else if (err.hasOwnProperty('description')) {
                    res.status(400).json(err.description.message)
                } else if (err.hasOwnProperty('price')) {
                    res.status(400).json(err.price.message)
                }
                else {
                    res.status(500).json({
                        message: err.message
                    })
                }
            })
    },
    deleteProduct: function (req, res) {
        Product
            .findOne({ _id: req.params.id })
            .then(product => {
                if (product) {
                    return Product
                    .findOneAndDelete({ _id: req.params.id })
                } else {
                    res.status(404).json({
                        msg: `Product not found`
                    })
                }
            })
            .then(() => {
                res.status(200).json({
                    msg: `Successfully deleted this product`
                })
            })
            .catch (err => {
                res.status(500).json({
                    message: err.message
                })
            })
       
    }
}