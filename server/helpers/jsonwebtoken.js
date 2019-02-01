const jwt = require('jsonwebtoken');

module.exports = {
    createToken: function(email) {
        return jwt.sign({
            email: email
        }, process.env.JWTTOKEN)
    },
    decodeToken: function(token, res) {
        try {
            let decoded = jwt.verify(token, process.env.JWTTOKEN);
            return decoded
        } 
        catch(err) {
            console.log(err, 'MASUK LAGI COIII')
            res.status(400).json({
                err: err, 
                message: 'invalid token'
            })
        }
    }
}