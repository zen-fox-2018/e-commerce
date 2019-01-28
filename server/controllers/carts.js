const { Cart, Transaction } = require('../models');
const { count } = require('../helpers')

class CartController {
  static create(userId) {
    return new Promise((resolve, reject) => {
      Cart.create({
        userId: userId
      })
        .then(cart => {
          resolve(cart);
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static addToCart(req, res) {
    let productId = req.body.productId;
    Cart.findOne({
      userId: req.user._id
    })
      .then(cart => {
        let index = cart.products.map(product => product.productId.toString()).indexOf(productId.toString());
        
        if (index >= 0) {
          cart.products[index].quantity++;
        } else {
          cart.products.push({
            productId: productId,
            quantity: 1
          })
        }
        cart.save()
        res.status(201).json(cart);
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        })
      })  
  }

  static decrementQuantity(req, res) {
    let productId = req.body.productId
    Cart.findOne({
      userId: req.user._id
    })
    .then(cart => {
      let index = cart.products.map(product => product.productId.toString()).indexOf(productId.toString());
      
      if (index >= 0) {
        cart.products[index].quantity--;
        cart.save()
        res.status(200).json(cart);
      } else {
        res.status(400).json({
          message: 'product not found',
          error: 'Please add to cart first'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })  
}

  static removeFromCart(req, res) {
    let productId = req.body.productId;
    Cart.findOne({
      userId: req.user._id
    })
      .then(cart => {
        cart.products = cart.products.filter(product => {
          return product.productId.toString() != productId.toString()
        })
        cart.save();
        res.status(200).json(cart)
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        })
      })
  }

  static getCart(req, res) {
    Cart.findOne({
      userId: req.user._id
    })
    .populate('products.productId')
    .populate('userId')
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        })
      })
  }

  static checkout(req, res) {
    let dataTransaction = {}
    let cart = req.body.cart
    if (cart.products.length) {
      Transaction.create({
        userId: cart.userId,
        products: cart.products,
        totalPrice: count.totalPrice(cart.products)
      })
        .then(transaction => {
          dataTransaction = transaction
          return Cart.findByIdAndUpdate(cart._id, {
            products: []
          })
        })
        .then(data => {
          res.status(201).json(dataTransaction)
        })
        .catch(error => {
          res.status(500).json({
            message: error.message
          })
        })      
    } else {
      res.status(400).json({
        message: 'Products Not Found'
      })
    }
  }
  
}

module.exports = CartController;