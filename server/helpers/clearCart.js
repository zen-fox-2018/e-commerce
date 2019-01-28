const { Cart } = require('../models')

module.exports = function(done) {
    if (process.env.NODE_ENV === 'test') {
        Cart
            .deleteMany()
            .then(data => {
                done()
            })
            .catch(err => {
                console.log(err);
            })
    }
}