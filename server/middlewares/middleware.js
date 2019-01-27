const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const {decodeToken} = require('../helpers/helper');

module.exports = {
  validateUsertoken(req, res, next) {
    decodeToken(req.headers.access_token, (err, data) => {
      if (err) {res.status(406).json({msg: 'Invalid Token'})}
      else {
        User
          .findById(data.id)
          .then(user => {
            if (user) {
              req.user = user
              next()
              return ''
            } else {
              res.status(500).json({msg: 'User not found'})
            }
          })
          .catch(err => {
            res.status(406).json({msg: 'Invalid Token'})
          })
      }
    })
  },
  authorization(req, res, next) {
    Product.findOne({
      _id: req.params.id
    })
      .then(product => {
        if(String(product.user) === String(req.user._id)) {
          next()
          return
        } else {
          console.log('masuk error')
          res.status(401).json({msg: 'Error Unauthorize'})
        }
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  productCartUnique(req, res, next) {
    Cart.findOne({
      user: req.user.id,
      product: req.body.product
    })
      .then(cart => {
        if(!cart) next()

        else {
          res.status(400).json({msg: 'Product already in cart'})
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
}