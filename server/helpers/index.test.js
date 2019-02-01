const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

module.exports = {
    clearDBUser: function (done) {
        if (process.env.NODE_ENV === 'test') {
            User
                .deleteMany({})
                .then(() => {
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    clearDBProduct: function (done) {
        if (process.env.NODE_ENV === 'test') {
            Product
                .deleteMany({})
                .then(() => {
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    clearDBCart: function (done) {
        if (process.env.NODE_ENV === 'test') {
            Cart
                .deleteMany({})
                .then(() => {
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}