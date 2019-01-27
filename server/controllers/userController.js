var User = require(`../models/User`)
var Cart = require(`../models/Cart`)

var jwt = require(`jsonwebtoken`)
var helpers = require(`../helpers/helpers`)
var axios = require(`axios`)

module.exports = {
    create: function (req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            provinceId: req.body.provinceId,
            cityId: req.body.cityId
        }).then((result) => {
            if (result) {
                jwt.sign(req.body, process.env.JWT_SECRET, function (err, encoded) {
                    if (err) {
                        res.status(500).json({ msg: `jwt error when encoding` })
                    } else {
                        res.status(201).json({
                            email: result.email,
                            password: result.password,
                        })
                    }
                })
            }
        }).catch((err) => {
            res.status(401).json({ msg: `internal server error`, err: err })

        });
    },
    login: function (req, res) {
        User.findOne({
            email: req.body.email
        }).then((result) => {
            if (result) {

                if (helpers.compare(req.body.password, result.password)) {
                    jwt.sign({
                        id: result._id,
                        email: req.body.email
                    }, process.env.JWT_SECRET, function (err, encoded) {
                        
                        if (err) {
                            
                            res.status(500).json({ msg: `internal server error` })
                        } else {
                            res.status(200).json({
                                id: result._id,
                                email: req.body.email,
                                provinceId: result.provinceId,
                                cityId: result.cityId,
                                token: encoded
                            })
                        }
                    })
                } else {
                    res.status(401).json({ msg: `salah username/password` })
                }
            } else {
                res.status(400).json({ msg: `cant login, user not found` })
            }
        }).catch((err) => {

            res.status(500).json({ msg: `internal server error`, err: err })
        });
    },
    updateCart: function (req, res) {
        Cart.findOne({
            userId: req.params.userId,
            item: req.body.itemId
        }).populate('item')
            .then((result) => {
                if (!result) {
                    return Cart.create({
                        userId: req.params.userId,
                        item: req.body.itemId
                    }).then((result) => {
                        return Cart.findOne({
                            userId: req.params.userId,
                            item: req.body.itemId
                        }).populate(`item`)
                    }).catch((err) => {

                    });
                } else {
                    return Cart.findOneAndUpdate({
                        userId: req.params.userId,
                        item: req.body.itemId
                    }, {
                            userId: req.params.userId,
                            item: req.body.itemId,
                            qty: result.qty + 1
                        }).populate('item')
                }

            }).then((createdCart) => {
                console.log(createdCart);
                
                res.status(201).json(createdCart)

            }).catch((err) => {
                console.log(err);
                
                res.status(500).json({msg: `internal server error`, err: err})

            });
    },
    findOne: function (req, res) {
        Cart.find({ userId: req.params.userId }).populate('item')
            .then((result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(200).json([])
                }
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error` })
            });
    },
    updateQty: function (req, res) {
        Cart.findOneAndUpdate({
            userId: req.params.userId,
            _id: req.params.cartId
        }, {
                qty: req.body.qty
            }).then((result) => {
                if (result) {
                    res.status(200).json(result)
                }

            }).catch((err) => {
                console.log(err);
                res.status(500).json({ msg: `internal server error`, error: err })

            });
    },
    deleteOneCart: function (req, res) {
        Cart.findOneAndDelete({
            userId: req.params.userId,
            _id: req.params.cartId
        }).then((result) => {
            if (result) {
                res.status(200).json(result)
            }

        }).catch((err) => {
            res.status(500).json({ msg: `internal server error`, err: err })

        });
    },
    emptyCart: function (req, res) {

    },
    ongkir: function (req, res) {
        console.log(req.body.weight);
        
        axios.post(`https://api.rajaongkir.com/starter/cost`, req.body, {
            headers: {
                key: '6c5a3934c27a12b96f51bf4b680836b5'
            }
        }).then((result) => {
            console.log(result.data);
            res.send(result.data)
        }).catch((err) => {
            console.log(err.data);
            
            res.send(err.data)
        });
        
    }
};
