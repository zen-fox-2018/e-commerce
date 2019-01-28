const UserModel = require('../models/user');
const ItemModel = require('../models/item');
const _ = require('underscore');

class Cart {
  static delete (req,res) {
    let customerId= req.decoded._id;
    UserModel.findOneAndUpdate({
      _id: String(customerId)
    }, 
    {
      $set : 
      {
        cart : null
      }
    }, 
    { 
      new: true
    })
    .then( updated => {
      delete updated.password;
      res.status(200).json({
        message: 'Successfully deleted user cart.',
        user: updated
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'could not delete user cart.'
      })
    })
  }

  static checkout (req,res) {
    let cartItems;
    let cartItemIds =[];
    let customerId= req.decoded._id;
    UserModel.findOne({
      _id: String(customerId)
    })
    .then(user => {
      user.history.push(user.cart);
      if(user.cart) {
        cartItems = user.cart.items;
        cartItems.forEach(item => cartItemIds.push(item.item));
      }
      user.cart = null;
      return user.save()
    })
    .then(() => {
      return ItemModel.find({_id : { $in : cartItemIds}});
    })
    .then(items => {
      items.forEach(item => {
        let bought = cartItems.find( cartItem => cartItem.item == String(item._id));
        item.stock = item.stock - bought.quantity;
      });
      items.forEach(item => item.save());
    })
    .then(() => {
      res.status(200).json({
        msg: 'successfully checked out user cart.'
      })
    })
    .catch(err => {
      // console.log(err)
      res.status(400).json({
        msg: "could not checkout user cart.",
        error
      })
    });
  }

  static updateCart (req,res) {
    // console.log('============> updating cart');
    // console.log( req.body.cart)
    let customerId = req.decoded._id;
    let cart = req.body.cart;
    //customer add item to cart, delete item, update quantity
    UserModel.findOneAndUpdate({
      _id: customerId 
    }, {
      $set: {cart}
    }, {
      new : true
    })
    .populate('cart.items.item')
    .then(user => {
      console.log('=====> successfully updated cart.')
      res.status(200).json({
        msg:'successfully updated cart.',
        user 
      })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        msg: 'could not update cart',
        error
      })
   
    })
  }
}

module.exports = Cart;