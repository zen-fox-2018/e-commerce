const mongoose = require('mongoose')
const Schema = mongoose.Schema


var testiSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  testi: String,
  rating: Number,

});

const Testi = mongoose.model('Testi', testiSchema);

module.exports = Testi