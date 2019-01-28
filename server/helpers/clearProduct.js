const { Product } = require('../models')

module.exports = function(done) {
    if (process.env.NODE_ENV === 'test') {
        Product
            .deleteMany()
            .then(data => {
                done()
            })
            .catch(err => {
                console.log(err);
            })
    }
}