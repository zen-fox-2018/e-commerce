var bcrypt = require(`bcryptjs`)

module.exports = {
    hash: function (plainPassword) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(plainPassword, salt);
        return hash      
    },
    compare: function (plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword); 
    }
};
