const { jwt } = require('../helpers');
const { User, Product } = require('../models');
module.exports = {
  isLogin: (req, res, next) => {
    
    let payloads = jwt.jwtVerify(req.headers.token);
    
    if (req.headers.token) {
      User
      .findOne({
        email: payloads
      })
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({
            message: 'Invalid Token',
            error: 'Authorization failed'
          })
        }
      })
      .catch(error => {
        res.status(500).json({
            message: error.message
          })
        })
    } else {
      res.status(400).json({
        message: 'Invalid Token',
        error: 'Authorization failed'
      })
    }
  },
  isAdmin: (req, res, next) => {
    console.log(req.user);
    
    if (req.user.role === 'admin') {
      next()
    } else {
      res.status(401).json({
        message: 'Unauthorized'
      })
    }
  },
  checkProduct: (req, res, next) => {
    Product.findById(req.body.productId)
      .then(product => {
        if (product) {
          next();
        } else {
          res.status(400).json({
            message: 'Product Not Found'
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        })
      })
  }
}