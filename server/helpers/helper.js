const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var randomize = require('randomatic');

module.exports = {
  generateToken(id, email) {
    var token = jwt.sign({id, email}, process.env.JWT_SECRET);
    return token
  },
  decodeToken(token, cb) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(!err) cb(null, decoded)

      else cb(null)
    });
  },
  hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
  },
  comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
  twillio(phoneNumber, code) {
    var accountSid = 'ACbeb6590a0c301aeb38a23e9358bfdd9c';
    var authToken = 'c6c2132f06742eb3a8a970db28e4fbe4';

    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);

    client.messages.create({
        body: code,
        to: `${phoneNumber}`, 
        from: '+18302153894'
    })
    .then((message) => console.log(message.sid));
  }
}