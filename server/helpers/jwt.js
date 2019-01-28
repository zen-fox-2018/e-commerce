require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = {
  jwtSign: (data) => {
    return jwt.sign(data, secret)
  },
  jwtVerify: (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return false;
    }
  }
}