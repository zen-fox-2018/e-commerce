const User =  require('../models/User')
const jwt  = require('jsonwebtoken')
const {checkPassword} = require('../helper/helper')

module.exports = {
  register(req,res){
    let newUser = {name, email, password} = req.body
    User
      .create(newUser)
      .then( user => {
        res.status(201).json({user, message: "Success register, please login to continue"})
      })
      .catch( error => {
        let message = error.message
        let errors = error.errors

        if(errors.email){
          message = errors.email.message
        } else if(errors.password){
          message = errors.password.message
        }
        
        res.status(400).json({error, message})
      })
  },
  login(req,res){
    let {email, password} = req.body

    User
      .findOne({email})
      .then( user => {
        if(user){
          if(checkPassword(password, user.password)){
            let token = jwt.sign({email}, process.env.JWT_SECRET)
            res.status(200).json({token, role: user.role, message: 'Success login'})
          } else {
            res.status(400).json({message: 'wrong email/password'})
          }
        } else {
          res.status(400).json({message: 'wrong email/password'})
        }
      })
      .catch( error => {
        console.log(error)
        res.ststus(500).json({error, message: error.message})
      })
  }
}