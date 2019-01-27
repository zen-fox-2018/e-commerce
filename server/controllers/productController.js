var Product = require(`../models/Product`)

module.exports = {
    create: function (req, res) {
        Product.create(req.body)
            .then((result) => {
                if (result) {
                    res.status(201).json(result)
                }
            }).catch((err) => {
                res.status(401).json({ msg: `internal server error`, err: err })
            });
    },
    findAll: function (req, res) {
        Product.find({})
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, err: err })
            });
    },
    findOne: function (req, res) {
        Product.findById(req.params.id)
            .then((result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(401).json({ msg: `cant find product` })
                }
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error` })
            });
    },
    update: function (req, res) {
        Product.findOneAndUpdate({
            _id: req.params.id
        }, req.body).then((result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ msg: `cant update, product not found` })
            }
        }).catch((err) => {
            res.status(500).json({ msg: `internal server error`, err: err })
        });
    },
    delete: function (req, res) {
        Product.findOneAndDelete({
            _id: req.params.id
        }).then((result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({msg: `cant delete, product not found`})
            }
            
        }).catch((err) => {
            console.log(err);
            
            res.status(500).json({msg: `internal server error`})
        });
    },
};
