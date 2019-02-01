const User = require('../models/User')
const bcrypt = require('../helpers/bcrypt')
const jwttoken = require('../helpers/jsonwebtoken')

module.exports = {
    userAuthentication: function(req, res, next) {
        let decoded = jwttoken.decodeToken(req.headers.token, res)
        User.find({ email: decoded.email }, function(err, user) {
            if (err) res.status(400).json({err:err})
            else {
                if (user) {
                    req.currentUser = user[0]
                    next()
                } else {
                    res.status(400).json({message: "User Not Found"})
                }
            }       
        })
    },
    checkPassword: function(req, res, next) {
        User.find({email: req.body.email}, function(err, user) {
            if (err) res.status(400).json({err: err.message})
            else {
                if (user.length == 0) {
                    res.status(400).json({message: 'User Not Found'})
                } else {
                    let isPassword = bcrypt.checkPassword(req.body.password, user[0].password)
                    if (isPassword) {
                        req.currentUser = user[0]
                        next()
                    } else {
                        res.status(400).json({message: 'Wrong Password'})
                    }
                }
            }
        })
    },
    userAuthorization: function(req, res, next) {
        User.findById(req.currentUser._id, function(err, user) {
            if (err) res.status(400).json({err: err.message})
            else {
                let status = false
                user.article.forEach(article_id => {
                    if (JSON.stringify(article_id) == JSON.stringify(req.params.article_id)) {
                      status = true
                    }
                });
                if (status) {
                    next()
                } else {
                    res.status(400).json({message: 'Unauthorize User'})
                }
            }
        })
    },
    isAdmin: function(req, res, next) {
        if (req.currentUser.role == true) {
            next()
        } else {
          res.status(400).json({message: 'Not An Admin !!!'})
        }
    }
}