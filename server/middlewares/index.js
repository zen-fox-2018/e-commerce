const User = require('../models/User')
const { verifyToken } = require('../helpers')

module.exports = {
    isLogin: function(req, res, next) {
        let token = req.headers.token
        if(token) {
            let decoded = verifyToken(token)
            User
                .findOne({ email: decoded.email })
                .then(user => {
                    if (user) {
                        req.currentUser = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                        next()
                    } else {
                        res.status(401).json({
                            msg: `Unauthorized user`
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: `Internal server error`
                    })
                })
        } else {
            res.status(401).json({
                msg: `Unauthorized user`
            })
        }
    },
    isAdmin: function (req, res, next) {
        if(req.currentUser.role === 'Admin') {
            next()
        }
    }
}