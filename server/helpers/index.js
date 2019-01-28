const bcrypt = require('bcryptjs')

module.exports = {
    hashPass(pass) {
        return bcrypt.hashSync(pass, 10);
    },
    comparePass(pass, hash) {
        return bcrypt.compareSync(pass, hash)
    }
}