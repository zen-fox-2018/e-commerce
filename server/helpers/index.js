var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var salt = bcrypt.genSaltSync(6);

module.exports = {
    hash : function(pass){
        return bcrypt.hashSync(pass, salt);
    },
    compare : function(pass, hashPass){
        return bcrypt.compareSync(pass, hashPass); 
    },
    sign : function(params){
        return jwt.sign(params, process.env.JWT_SECRET);
    },
    verify: function(token){
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}