const Product = require('../models/product');

module.exports = {
  create(req, res) {
    Product.create({
      name: req.body.name,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: req.file.cloudStoragePublicUrl,
      description: req.body.description,
      user: req.user._id
    })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  getAll(req, res) {
    Product.find({})
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  update(req, res) {
    Product
      .findByIdAndUpdate(
        req.params.id
      , {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image,
        description: req.body.description
      }, {
        new: true
      })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  remove(req, res) {
    Product
      .deleteOne({
        _id: req.params.id
      })
      .then(result => {
        res.status(200).json({id: req.params.id})
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }
}