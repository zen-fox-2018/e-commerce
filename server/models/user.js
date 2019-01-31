const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const itemModel = require('../models/item'); 
var emailRegex = new RegExp("^.+@[^\.].*\.[a-z]{2,}$");

var cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'item'
  },
  quantity: {
    type: Number,
    min: 1
  }
})
var cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  delivered: {
    type: Boolean,
    default: false
  },
  subtotal: {
    type: Number,
    default: 0
  }
  
})

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: val => (emailRegex.test(val))
    }
  },
  password: {
    type: String,
    required: true,
    maxlength: 100
  },
  firstName: String,
  lastName: String,
  admin: {
    type: Boolean,
    default: false
  },
  cart: {
    type: cartSchema,
    default: null
  },
  history: {
    type: [cartSchema],
    default: []
  }
})

//populate history items
userSchema.post('find', async function(docs) {
  // console.log('popp')
  for (let doc of docs) {
    await doc.populate('history.items.item').execPopulate();
  }
})
  //if quantity of item exceeds item stock then throw an error;
userSchema.pre('findOneAndUpdate', function(next) {
  this.populate('cart.items.item');
  let update = this._update['$set'];
  if(!update || this.update.cart == null) {
    //dont check stock
    return next();
  } else {
    // console.log(this._update['$set'].cart)
    let itemsArray = update.cart.items; 
    let idArray = [];
    itemsArray.forEach(item => idArray.push(item.item));
    //check stock
    itemModel.find({_id :{$in: idArray}})
    .then(items => {
      let nostock = [];
      items.forEach(item => {
        itemsArray.forEach(cartItem => {
          if(cartItem.item == item._id && cartItem.quantity > item.stock)  nostock.push(item);
        });
      });
      if(nostock.length) {
        return next({msg: 'no stock, could not update cart.', nostock});
      } else {
      console.log('ok2')
        next();
      }
    })
  }
})
// userSchema.post('findOne', function (doc, next) {

// })
userSchema.post('findOneAndUpdate', function(doc, next) {
  if(doc ==null || doc.cart == null) return next();
  else {
    let subtotal = 0;
    let total = 0;
    let cartItems = doc.cart.items;
    cartItems.forEach(cartItem => subtotal += cartItem.item.price * cartItem.quantity);
  // console.log('==================>')
  // console.log(subtotal);
    doc.cart.subtotal = subtotal;
    doc.save();
    next();
  }

}) 

//HASH USER PASSWORD ON CREATE NEW USER
userSchema.pre('save', function (next) {
  let self = this;
  if(!this.isModified('password')) return next();
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(self.password, salt, function(err, hash) {
      if (err) return next(err);
      self.password = hash;
      next();
    });
  });
})


//CHECK USER PASSWORD ON SIGN IN 
userSchema.methods.comparePassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
}
const User = mongoose.model('User', userSchema);
module.exports = User;