const User = require('../models/user')
const {verify} = require('../helpers/index')
module.exports = {
    Authentications : function(req, res, next){
        var {email} = verify(req.headers.token)
        User.findOne({email: email})
        .then(user => {
            if(user){
                req.userId = user._id
                req.role = user.role
                next()
            }else{
                res.status(404).json({
                    message : 'User not found'
                })
            }
        })
        .catch(err => {
            console.log(err,"=============")
            res.status(500).json({ 
                message : 'Internal server error',
                error : err
            })
        })
    },
    AdminAuthentication : function(req, res, next){
        if(req.role == 'admin'){
            next()
        }else{
            res.status(401).json({
                message : 'Authentication error. Admin only!'
            })
        }
    }
}