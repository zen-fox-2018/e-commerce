const Product = require('../models/Product')

class Controller {
    static findAll(req, res) {
        Product.find({}).populate('userId').exec()
            .then(list => {
                res.status(200).json({
                    data: list
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static create (req, res) {

        if (!req.body.name || !req.body.price) {
            res.status(400).json({
                msg: `Name and price must be filled`
            })
        } else if (isNaN(req.body.price)) {
            res.status(400).json({
                msg: `Price must be number`
            })
        } else if (req.body.qty <= 0 && req.body.qty) {
            res.status(400).json({
                msg: `Minimal quantity is 1`
            })
        } else {
            let product = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                userId: req.currentUserId,
                qty: req.body.qty,
                image: req.file.cloudStoragePublicUrl
            }
    
            Product.create(product)
                .then(data => {
                    res.status(201).json({
                        msg: `Success create product`,
                        data
                    })
                    req.io.emit('new-product', data)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        msg: err.message
                    })
                })

        }
    }

    static update (req, res) {
        if (isNaN(req.body.price) && req.body.price) {
            res.status(400).json({
                msg: `Price must be number`
            })
        } else {
            let image = undefined
            if (req.file) {
                image =req.file.cloudStoragePublicUrl
            }
            let product = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image
            }
    
            for (let i in product) {
                if (!product[i]) {
                    delete product[i]
                }
            }
         
    
            Product.findByIdAndUpdate(req.params.id, {$set: product}, {new: true})
                .then(data => {
                    res.status(200).json({
                        msg: `Success update products`,
                        data
                    })
                    req.io.emit('edit-product', data)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        msg: err.message
                    })
                })

        }
        
    }

    static delete (req, res) {
        Product.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({
                    msg: `Success delete products`
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findMy (req, res) {
        Product.find({userId: req.params.id}).populate('userId').exec()
            .then(data => {
                res.status(200).json({
                    msg: `Here are your items`,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
    
    static findOne (req, res) {
        Product.findById(req.params.id).populate('userId').exec()
            .then(data => {
                res.status(200).json({
                    msg: `Success find one data`,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
} 
module.exports = Controller