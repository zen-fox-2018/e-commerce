const Cart = require('../models/cart');
const Product = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;
const Transaction = require('../models/transaction');

module.exports = {
  create: async (req, res) => {
    try {
      let cart = await Cart.create({
        user: req.decoded._id,
        items: [req.body.items]
      })
      res.status(201).json(cart)
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    }
  },
  read: async (req, res) => {
    try {
      let cart = await Cart.findOne({
        user: req.decoded._id
      }).populate('user').populate('items.product').exec();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({
        errors: err
      });
    };
  },
  addProd: async (req, res) => {
    try {
      let updated = await Cart.findByIdAndUpdate(req.params.id, {
        $push: {
          items: req.body.items
        }
      }, {
        new: true,
        runValidators: true
      });
      res.status(200).json(updated)
    } catch (err) {
      res.status(500).json({
        errors: err
      });
    };
  },
  addTotal: async (req, res) => {
    try {
      let updated = await Cart.update({
        _id: ObjectId(req.params.id),
        'items.product': ObjectId(req.body.product)
      }, {
        $inc: {
          'items.$.total': req.body.total
        }
      })
      res.status(200).json(updated)
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    }
  },
  remove: async (req, res) => {
    try {
      let remove = await Cart.findByIdAndUpdate(req.params.id, {
        $pull: {
          items: {
            product: ObjectId(req.params.product)
          }
        }
      }, {
        new: true
      })
      res.status(200).json(remove)
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    }
  },
  checkout: async (req, res) => {
    try {
      let cart = await Cart.findById(req.params.id)
      let products = []
      cart.items.forEach( async (e) => {
        products.push(e.product)
        await Product.findByIdAndUpdate(e.product, {
          $inc: {
            stock: - e.total
          }
        })
      });
      await Cart.findByIdAndDelete(req.params.id)
      let transaction = await Transaction.create({
        products: products,
        user: req.decoded._id,
        status: 'Pending',
        date: new Date()
      })
      res.status(200).json(transaction)
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    }
  }
};