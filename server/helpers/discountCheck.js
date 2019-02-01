const cron = require('node-cron');
const Item = require('../models/Item');

module.exports = {
  discount() {
    cron.schedule('0 * * * *', () => {
      Item.find({}, function(err, items) {
        if (err) console.log(err, 'discountCheck.js error');
        else {
          items.forEach(item => {
            if (item.dayRemaining > 0) {
              item.dayRemaining -= 1;
              Item.findByIdAndUpdate(item._id, { dayRemaining: item.dayRemaining }, function(err) {
                if (err) console.log(err, 'discountCheck.js error (reduce day remaining by one)');
              })
            } else {
              Item.findByIdAndUpdate(item._id, { discountPrice: 0 }, function(err) {
                if (err) console.log(err, 'discountCheck.js error(set discount price to 0)');
              })
            }
          })
        }
      })
    });
  }
}
