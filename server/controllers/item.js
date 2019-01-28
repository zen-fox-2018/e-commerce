const item = require('../models/item.js')
const _ = require('underscore');
//STORE PRODUCTS

class Item {
  static create (req,res) {
    let itemData = {
      name : req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      stock : Number(req.body.stock),
      price : Number(req.body.price),
      discount: Number(req.body.discount),
      imageUrl : req.imageUrl,
      thumbUrl : req.thumbUrl
    }
    item.create(itemData)
    .then(data => {
        res.status(200).json({
          msg:'successfully created new item.',
          data
        })
      }
    )
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg:'failed to create item.'
      })
    })
  }
  static getAll (req,res) {
    item.find()
    .then(items => {
      res.status(200).json({
        msg: 'successfully retrieved items.',
        items
      });
    })
    .catch (err => {
      console.log(err);
      res.status(400).json({
        msg:'failed to retrieve items.'
      })
    })
  }
  static findOne(req,res) {
    item.findOne({_id: String(req.params.itemId)})
    .then(item => {
      res.status(200).json({
        msg: 'successfully retrieved item.',
        item
      });
    })
    .catch (err => {
      console.log(err);
      res.status(400).json({
        msg:'failed to retrieve item.'
      })
    })
  }
  static update (req,res) {
    //update stock, update item details
    //update discount & price
    console.log(req.params.id)
    item.findOne({_id : req.params.id})
    .then(item => {
      let allowedFields = ['name','description','category','stock','price','discount'];
      Object.keys(req.body).forEach(field => allowedFields.includes(field) ? null : delete req.body[field]); 
      _.extend(item, req.body);
      return item.save();
    })
    .then(updated => {
      if(updated == null) throw 'item not found.';
      res.status(200).json({
        updated,
        msg: 'successfully updated data.',
      });
    })
    .catch (err => {
      console.log(err);
      res.status(400).json({
        msg:'failed to update data.'
      })
    })
  }

  static deleteOne (req,res) {
    item.findOneAndDelete({
      _id: req.params.id,
    })
    .then( data => res.status(200).json({
      msg: 'successfully deleted item.',
      data
    })
    )
    .catch (err => {
      // console.log(err);
      res.status(400).json({
      error: 'failed to delete item.'
    })
  })
  }
}

module.exports = Item;

