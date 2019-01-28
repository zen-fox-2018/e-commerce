//CRUD USER (for admin)
const Model = require('../models/user');
const jwt = require('jsonwebtoken');

// function deleteNulls(arr) {
//   return arr.filter(item => item !== null);
// }
module.exports = class User {
  static findHistory(req,res) {
    // console.log('=========>')
    Model.findOne({_id : req.decoded._id})
    .populate('history.items.item')
    .then(({history}) => {
      res.status(200).json({
        message: 'successfully retrieved user history',
        history
      })
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }
  static markDelivered (req,res) {
    Model.findOneAndUpdate({"_id" : req.decoded._id, "history._id" : req.headers.cartid}, {
      "$set": {
        "history.$.delivered":  true
        }
    }, {new: true})
    .populate('history.items.item')
    .then( ({history}) => {
      res.status(200).json({
        message: 'successfully updated history',
        history
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
  }

  static signUp (req,res) {
    let newUser ={
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    } 
    Model.findOne({email: newUser.email})
    .then(user => {
      if(user) {
        throw 'email is already registered.'
      } else {
        return Model.create(newUser)
      }
    })
    .then(response => {
      let token = jwt.sign(response.toObject(), process.env.JWT_SECRET);
      res.status(200).json({
        message:'successfully created new user',
        token
      })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        message: error
      })
    })
  }
  static signIn (req,res) {
    let userData;
    let loginData ={
      email: req.body.email,
      password: req.body.password
    } 
    Model.findOne({email: loginData.email})
    .populate('cart.items.item')
    .then(user => {
      if(user) {
        userData = user.toObject();
        delete userData.password;
        return user.comparePassword(loginData.password);
      } else throw 'email not registered.';
    })
    .then(same => {
      if(same) {
        //create JWT
        let token = jwt.sign(userData, process.env.JWT_SECRET);
        res.status(200).json({
          message: 'successfully signed in user.',
          token,
          cart: JSON.stringify(userData.cart)
        })
      } else throw 'wrong password.'
    })
    .catch(error => {
      // console.log(error)
      res.status(400).json({
        error: String('could not sign in user.')
      })
    })
  }

  static googleSignIn (req,res) {
    //after verifying gtoken upsert user into DB
    const payload = req.accessToken;
    // console.log(payload)
    Model.findOneAndUpdate({
      email: payload.email
    }, {
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name
    }, {
      upsert: true,
      new: true
    })
    .populate('cart.items.item')
    .then(user => {
      let userData = user.toObject();
      delete userData.password;
      const token = jwt.sign( userData , process.env.JWT_SECRET); 
        res.status(200).json({
          message: 'successfully signed in with Google.',
          token,
          cart: JSON.stringify(user.cart)
        })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        error
      })
    })
  }

  static adminSignIn (req,res) {
    let userData;
    let loginData ={
      email: req.body.email,
      password: req.body.password
    } 
    Model.findOne({email: loginData.email, admin: true})
    .then(user => {
      if(user) {
        userData = user.toObject();
        delete userData.password;
        return user.comparePassword(loginData.password);
      } else throw 'admin not registered.';
    })
    .then(same => {
      if(same) {
        //retrieve all customer data
        return Model.find({admin : false})
      } else throw 'wrong password.'
    })
    .then(data => {
      let token = jwt.sign(userData, process.env.JWT_SECRET);
      res.status(200).json({
        message: 'successfully signed in admin.',
        token,
        data
      })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        error: 'could not sign in admin.'
      })
    })
  }
  static findAll (req,res) {
    Model.find()
    .then(data => {
      res.status(200).json({
        message:'successfully retrieved users',
        data
      })
    })
    .catch(error => {
      res.status(400).json({
        message: error
      })
    })
  }
}