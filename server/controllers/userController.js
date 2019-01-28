const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { comparePw } = require('../helpers/hashPw')

require('dotenv').config()

module.exports = {
    registerUser: (req, res) => {
        console.log(req.body)
        let newUser = { name, email, password, address } = req.body.data
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    loginUser: (req, res) => {
        if(!req.body.data.email) {
            res.status(400).json({msg: 'Please fill in all the form'})
        } else if (!req.body.data.password) {
            res.status(400).json({msg: 'Please fill in all the form'})
        } else {

            User
                .findOne({email: req.body.data.email})
                .then(user => {
                    if (user) {
                         if (comparePw(req.body.data.password, user.password)) {
                            jwt.sign({
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role
                            }, process.env.JWT_SECRET, function(err, decoded) {
                                if(err) {
                                    res.status(500).json({msg: 'Error JWT'})
                                } else {
                                    res.status(200).json({token: decoded})
                                }
                            })
                        } else {
                            res.status(400).json({ msg: 'Email/password is wrong!' })
                        }
                    } else {
                        res.status(400).json({ msg : 'Email/password is wrong!' })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
        }
    },
    
}