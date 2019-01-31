const User = require('../models/User')
const Product  = require('../models/Product')
const jwt = require('jsonwebtoken')

function isLogin(req,res, next){
  let token = req.headers.token
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
    if(err){
      res.status(401).json({err, message: 'please login first'})
    } else {
      email = decoded.email
      User.findOne({email})
      .then( user => {
        if(user){
          // console.log('sudah login')
          req.current_user = user
          next()
        } else {
          res.status(401).json({err, message: 'please login first'})
        }
      })
      .catch( error => {
        res.status(500).json({error, message: 'Internal Server Error'})
      })
    }
  })
}

function isOwner(req,res,next){
  let productId = req.params.productId
  let userId = req.current_user._id
  Product.findById(productId)
  .then( product => {
    if(product.userId.toString() === userId.toString()){
      // console.log('owner')
      next()
    } else {
      // console.log('bukan owner')
      res.status(401).json({message: 'not yours'})
    }
  })
  .catch( error => {
    res.status(401).json({error, message: "Internal Server Error"})
  })
}

module.exports = { isLogin, isOwner }