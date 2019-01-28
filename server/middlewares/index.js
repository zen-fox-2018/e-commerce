const { User, Product } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
    checkLogin(req, res, next) {
        let { token } = req.headers
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            User
                .findOne({email: decoded.email})
                .then(user => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        res.status(404).json({msg: "please login first"})
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: "Internal server error",
                        error: err
                    })
                })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error",
                error: err
            })
        }
    },
    checkProduct(req, res, next) {
        Product
            .findById({_id: req.body.productId})
            .then(product => {
                if (product) {
                    next()
                } else (
                    res.status(404).json({msg: "product not found"})
                )
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    }
}