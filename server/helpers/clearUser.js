const clearUser = function(done) {
    const User = require('../models/User')
    return User.deleteMany({})
}

module.exports = clearUser