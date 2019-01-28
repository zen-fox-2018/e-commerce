const bcrypt = require('bcrypt');

const saltRounds = 4;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  hashPassword: (password) => {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  comparePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
}