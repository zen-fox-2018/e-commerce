var Cart = require('../models/cart')

module.exports = {
    create : function(req, res){
        var id = req.userId;
        Cart.findOne({user : id}, function(err, cart){
            if(err){
                res.status(400).json(err)
            }else{
                // console.log(req.body,"====")
                var cart = {product, quantity} = req.body;
                cart.totalPrice = cart.quantity * req.body.price
                cart.point = Math.floor(cart.totalPrice / 100000)
                cart.user = id

                console.log(cart,"====")
                Cart.create(cart, function(err, cart){
                    if(err){
                        res.status(400).json(err)
                    }else{
                        res.status(200).json(cart)
                    }
                })
            }
        })
    },
    delete : function(req, res) {
        Cart.findOne({_id : req.params.id}, function(err,cart){
            if(err) {
                 res.status(400).json(err)
            }else{
                if(cart){
                    console.log(cart.user.toString() == req.userId.toString())
                    if(cart.user.toString() == req.userId.toString() || req.role == 'admin'){
                        Cart.findOneAndDelete({ 
                            _id : req.params.id 
                        }, function(err, result){
                            if(err) {
                                console.log(err, "==========")
                                res.status(400).json(err)
                            }else{
                                res.status(200).json("Item has been deleted from the cart")
                            }
                        })
                    }else{
                        res.status(401).json('Error Authentication')
                    }
                }else{
                    res.status(404).json('Cart Not Found');
                }
            }
        })
    },
    findByUser : function(req, res) {
        Cart.find({user : req.userId})
        .populate("product")
        .exec()
        .then((carts) => {
            res.status(200).json(carts)
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })  
    }
}