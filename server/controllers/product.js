const { Product } = require('../models')

module.exports = {
    getAll(req, res) {
        Product
            .find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    getOne(req, res) {
        Product
            .findById(req.params.id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    create(req, res) {
        // console.log(req.body.data);
        const newProduct = { name, price, stock } = JSON.parse(req.body.data)
        if (req.file) {
            newProduct.image = req.file.cloudStoragePublicUrl
        }
        Product
            .create(newProduct)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(500).json({
                        msg: "Internal server error",
                        error: err
                    })
                }
            })
    },
    update(req, res) {
        const newProduct = { name, price, stock } = JSON.parse(req.body.data)
        for (const key in newProduct) {
            if (!newProduct[key]) {
                delete newProduct[key]
            }
        }
        if (req.file) {
            newProduct.image = req.file.cloudStoragePublicUrl
        }
        Product
            .findByIdAndUpdate(req.params.id, newProduct, {new: true, runValidators: true})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    delete(req, res) {
        Product
            .deleteOne({_id: req.params.id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    }
}