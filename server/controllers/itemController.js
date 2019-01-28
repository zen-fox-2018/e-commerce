const Item = require('../models/Item');

module.exports = {
    createItem: function(req, res) {
      let newItem = new Item({
        developer: req.body.developer,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        stock: req.body.stock,
        category: req.body.category
      })
      newItem.save(function(err)  {
        if (err) res.status(400).json({err: err.message})
        else {
          res.status(200).json(newItem)
        }
      })
    },
    getAllItem: function(req, res) {
      Item.find({}, function(err, items) {
          if (err) res.status(400).json({err: err.message})
          else {
            res.status(200).json(items)
          }
      })
    },
    updateItem: function(req, res) {
      let updated = { developer, name, price, description, image, stock, category } = req.body
      Item.findByIdAndUpdate(req.params.item_id, updated, function(err, item) {
        if (err) res.status(400).json({err: err.message})
        else {
          res.status(200).json(item)
        }
      })
    },
    deleteItem: function(req, res) {
      Item.findByIdAndDelete(req.params.item_id, function(err) {
        if (err) res.status(400).json({err: err.message})
        else {
          res.status(200).json({
              message: 'success delete item',
              item_id: req.params.item_id
          })
        }
      })
    }
}
