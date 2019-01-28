const Cart = require('../models/Cart');

module.exports = {
    createCart: function(req, res) {
      Cart.find({ userId: req.currentUser._id }, function(err, cart) {
        if (err) res.status(400).json({err: err.message});
        else {
          if (cart.length == 0) {
            let newCart = new Cart ({
              userId: req.currentUser._id,
              itemId: req.body.itemId
            })
            newCart.save(function(err) {
                if (err) res.status(400).json({err: err.message});
                else {
                  res.status(200).json(newCart);
                }
            })
          } 
          else {
            Cart.findByIdAndUpdate(cart[0]._id, { $push: { itemId: req.body.itemId }}, function(err, cartAdded) {
              if (err) res.status(400).json({err: err.message});
              else {
                res.status(200).json(cartAdded);
              }
            })
          }
        }
      })
    },
    getUserCart: function(req, res) {
      Cart.find({userId: req.currentUser._id})
        .populate('userId') 
        .populate('itemId')
        .exec((err, cart) => {
          if (err) res.status(400).json({err: err.message});
          else {
            res.status(200).json(cart);
          }
        })
    },
    removeOne: function(req, res) {
      Cart.find({ userId: req.currentUser._id }, function(err, cart) {
        if  (err) res.status(400).json({err: err.message})
        else {          
          let loopthis = cart[0].itemId;
          let index = 0;
          for( let i = 0; i < loopthis.length; i++) {
            if (loopthis[i] == req.params.item_id) {
              index = i;
              break;
            }
          }
          cart[0].itemId.splice(index, 1)
          Cart.findOneAndUpdate({ userId: req.currentUser._id },cart[0], function(err, new_cart) {
            if (err) res.status(400).json({err: err.message})
            else {
              res.status(200).json(new_cart)
            }
          })
        }
      })
    },
    removeAll: function(req, res) {
      Cart.findOneAndUpdate({ userId: req.currentUser._id }, { $pull: {itemId: req.params.item_id} }, function(err, item) {
        if (err) res.status(400).json({err: err.message})
        else {
          res.status(200).json(item);
        }
      })
    },
    deleteCart: function(req, res) {
      Cart.findByIdAndDelete(req.params.cart_id, function(err) {
          if (err) res.status(400).json({err: err.message})
          else {
            res.status(200).json({ 
                message: 'success delete cart',
                delete_id: req.params.cart_id
            })
          }
      })
    }
}