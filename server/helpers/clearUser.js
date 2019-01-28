const { User } = require('../models')

module.exports = function(done) {
    if (process.env.NODE_ENV === 'test') {
        User
            .deleteMany()
            .then(data => {
                done()
            })
            .catch(err => {
                console.log(err);
            })
    }
}