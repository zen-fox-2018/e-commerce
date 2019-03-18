const Item = require('../models/Item')

class ItemController {

  static getItems(req, res) {
    Item.find()
      .then(function(items) {
        res.status(200).json(items)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static createItem(req, res) {
    let obj = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.cloudStoragePublicUrl
    }

    Item.create(obj)
      .then(function(item) {
        res.status(200).json(item)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getItem(req, res) {
    Item.findById(req.params.itemId)
      .then(function(item) {
        res.status(200).json(item)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateItem(req, res) {
    Item.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true})
      .then(function(item) {
        res.status(200).json(item)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteItem(req, res) {
    Item.findByIdAndRemove(req.params.itemId)
      .then(function(item) {
        res.status(200).json(item)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }
}

module.exports = ItemController