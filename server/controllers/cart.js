var Cart = require('../models/cart')

module.exports = {
    create : function(req, res){
        var id = req.userId;
        Cart.findOne({user : id}, function(err, cart){
            if(err){
                res.status(400).json(err)
            }else{
                var items = {item, quantity} = req.body;
                items.subtotal = items.quantity * req.body.price
                items.point = Math.floor(items.subtotal / 100000)
                
                if(cart){
                    Cart.findOneAndUpdate({user : id}, {$push : {items : items}}, {new : true}, function(err, cart){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json(cart)
                        }
                    })
                }else{
                    var input = {items, user : id}
                    Cart.create(input, function(err, cart){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json(cart)
                        }
                    })
                }
            }
        })
    },
    delete : function(req, res) {
        Cart.findOne({user : req.userId}, function(err,cart){
            if(err) {
                 res.status(400).json(err)
            }else{
                if(cart){
                    if(cart.user == req.userId || req.role == 'admin'){
                        Cart.findOneAndUpdate({ 
                            user : req.userId 
                        }, {
                            $pull : { 
                                items : {
                                    _id : req.params.id 
                                } 
                            } 
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
    }
}