const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
  name : String,
  brand: String,
  description: String,
  category: {
    type: String,
    validate: {
      validator: function(value) {
        let categories =['shoes','accessories']
        return categories.includes(value);
      }
    }
  },
  stock: {
    type: Number,
    min: 0
  },
  price : {
    type: Number,
    min: 1000
  },
  discount: {
    type: Number,
      min: 0,
      max: 0.50
  },
  imageUrl: String,
  thumbUrl: String
})

const Item = mongoose.model('item', itemSchema);

module.exports = Item;

