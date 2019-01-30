const verifyToken = require('../helpers/verifyToken')
const User = require('../models/User')
const Cart = require('../models/Cart')

function userAuth(req, res, next) {
    const email = verifyToken(req, res).email
    let id;
    let tempUser;
    User.findOne({email: email})
        .then(user => {
            if(user) {
                id = user._id
                tempUser = user

                return Cart.findById(req.params.id)
            } else {
                res.status(403).json({
                    msg: 'not authorize',
                })
            }
        })
        .then(cart => {
            if(!cart) {
                req.current_user = tempUser
                next()
            } else {
                let strId = id.toString()
                let strUserId = cart.userId.toString()
                if(strId === strUserId && tempUser.role === 'buyer') {
                    req.current_user = tempUser
                    next()
                } else {
                    res.status(403).json({
                        msg: 'not authorize',
                    })
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: 'internal server error',
                error: err
            })
        }) 
}

module.exports = userAuth