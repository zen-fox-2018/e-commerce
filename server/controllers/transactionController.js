var Cart = require(`../models/Cart`)
var Transaction = require(`../models/Transaction`)

module.exports = {
    create: function (req, res) {
        Cart.find({
            userId: req.body.userId
        }).then((result) => {
            let obj = {}
            obj.userId = req.body.userId
                
            
        }).catch((err) => {
                res.send(err)
            });
    }
};
