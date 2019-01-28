const Product = require('../models/Product')

module.exports = {
    createProduct : (req, res) => {
        let productData = { name, description, price, category } = req.body
        productData.img = req.file.cloudStoragePublicUrl
        Product
            .create(productData)
            .then(product => {
                res.status(201).json({data: product})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    findAllProduct: (req, res) => {
        Product
            .find({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })

    },
    findOneProduct: (req, res) => {
        Product
            .findById(req.params.id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    updateProduct: (req, res) => {
        if(!req.body.name) {
            res.status(404).json({msg: 'Product name cannot be empy'})
        } else if (!req.body.price) {
            res.status(404).json({msg: 'Product price cannot be empy'})
        } else if (!req.params.id) {
            res.status(404).json({msg: 'User not authenticate'})
        } else {
            let productData = { name, description, price, category } = req.body
            Product
                .findByIdAndUpdate(req.params.id, {$set: productData}, {new: true})
                .then(updatedProduct => {
                    res.status(200).json({ data: updatedProduct })
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }
    },
    deleteProduct: (req, res) => {
        if (!req.params.id) {
            res.status(404).json({msg: 'User not authenticate'})
        } else {
            Product
                .findByIdAndDelete(req.params.id)
                .then(deletedProduct => {
                    res.status(200).json({ data: deletedProduct })
                })
                .catch(err => {
                    // console.log(err.message)
                    res.status(500).json({
                        msg: 'Internal Server Error',
                        err: err.message
                    })
                })
        }
    }
}