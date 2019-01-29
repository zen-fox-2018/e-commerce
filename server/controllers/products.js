const { Product } = require('../models');

class ProductController {
  static create(req, res) {
    console.log('masuooooooook');
    Product
      .create({
        name: req.body.name,
        price: req.body.price,
        image_url: req.file.cloudStoragePublicUrl,
        image_filename: req.file.cloudStorageObject
      })
      .then(product => {
        res.status(201).json(product);
      })
      .catch(error => {
        console.log(error);
        
        if (error.name == 'ValidationError') {
          res.status(400).json({
            message: error.name,
            error: error.erros
          })
        } else {
          res.status(500).json({
            message: error.message
          })
        }
      })
  }

  static getAll(req, res) {
    Product
      .find({})
      .then(products => {
        res.status(200).json(products);
      })
      .catch(error => {
        // console.log(error)
        res.status(500).json({
          message: error.message
        })
      })
  }

  static getOne(req, res) {
    Product
      .findById(req.params.id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        })
      })
  }

  static delete(req, res) {
    Product
      .findByIdAndDelete(req.params.id)
      .then(product => {
          res.status(200).json(product)
      })
      .catch(error => {
        // console.log(error)
        if (error.name =='CastError') {
          res.status(400).json({
            message: 'Product Not Found'
          })  
        } else {
          res.status(500).json({
            message: error.message
          })
        }
      })
  }

  static update(req, res) {
    let updateProduct = req.body;
    Product
      .findByIdAndUpdate(req.params.id, updateProduct, { new: true, runValidators: true })
      .then(product => {
        if (product) {
          res.status(200).json(product)
        } else {
          res.status(400).json({
            message: 'Product Not Found'
          })
        }
      })
      .catch(error => {
        // console.log(error);
        if (error.name == 'ValidationError') {
        res.status(400).json({
            message: error.name,
            error: error.erros
          })
        } else {
          res.status(500).json({
            message: error.message
          })
        }
      })
  }
}

module.exports = ProductController;