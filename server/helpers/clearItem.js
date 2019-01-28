const clearItem = function() {
    const Item = require('../models/Item')
    return Item.deleteMany({})
}

module.exports = clearItem;