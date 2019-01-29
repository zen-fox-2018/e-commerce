const User = require('../models/user')

module.exports = {
    checkEmail : function(req, res){
        User.findOne({email : req.body.email})
        .then((email) => {
            if(email){
                res.status(404).json('email already exist')
            }else{
                res.status(200).json('email can be used')
            }
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    }
}