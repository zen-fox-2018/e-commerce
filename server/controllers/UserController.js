const User = require('../models/User')
const { compare } = require('../helpers')
const jwt = require('jsonwebtoken')

class Controller {
    static create (req, res) {

        if (!req.body.name || !req.body.email || !req.body.password) {
            res.status(400).json({
                msg: `Name, email and password must be field`
            })
        } else {
            let image = null
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                rating: 0,
                image
            }
            if (req.file) {
                image = req.file.cloudStoragePublicUrl
            }
    
            User.create(user)
                .then(data => {
                    res.status(201).json({
                        msg: `Success create user`,
                        data,
                        token: jwt.sign({ id: data._id }, process.env.JWT)
                    })
                })
                .catch(err =>{
                    console.log(err)
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
       
    }

    static login (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                msg: `All field must be filled`
            })
        } else {
            let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!regEx.test(req.body.email)) {
                res.status(400).json({
                    msg: `Email is not valid`
                })
            } else {
                User.findOne({email : req.body.email})
                    .then(found => {
                        if (!found) {
                            res.status(404).json({
                                msg: `User not found`
                            })
                        } else {
                            if (!compare(req.body.password, found.password)) {
                                res.status(400).json({
                                    msg: `Wrong password`
                                })
                            } else {
                                res.status(200).json({
                                    msg: `Success login`,
                                    token: jwt.sign({ id: found._id }, process.env.JWT),
                                    data: found
                                })
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            msg: err.message
                        })
                    })

            }

        }
    }

    static findOne (req, res) {
        User.findById(req.params.id)
            .then(data => {
                res.status(200).json({
                    msg: `Here are your profile`,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })

    }

}
module.exports = Controller